import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  LogOut,
  Save,
  Undo2,
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../../convex/_generated/api'
import { AdminLogin } from '#/components/admin/admin-login'
import { AdminTokenProvider } from '#/components/admin/admin-context'
import { SECTION_SCHEMAS } from '#/components/admin/section-schema'
import { SectionEditor } from '#/components/admin/section-editor'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#/components/ui/alert-dialog'
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { ScrollArea, ScrollBar } from '#/components/ui/scroll-area'
import { Separator } from '#/components/ui/separator'
import { Skeleton } from '#/components/ui/skeleton'
import { Toaster } from '#/components/ui/sonner'
import { Spinner } from '#/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { useAdminSession } from '#/hooks/use-admin-session'
import { deepEqual } from '#/lib/deep-equal'
import { DEFAULT_CONTENT, resolveContent } from '#/lib/site-content'
import type { SectionId } from '#/lib/site-content'

export const Route = createFileRoute('/admin')({ component: AdminPage })

type SectionValue = Record<string, unknown>
type Drafts = Partial<Record<SectionId, SectionValue>>

function errorMessage(error: unknown) {
  if (error instanceof Error) {
    // Convex prefixes thrown errors with the function path; drop it.
    return error.message.replace(/^\[.*?\]\s*/, '').split('\n')[0]
  }
  return 'Something went wrong.'
}

function AdminPage() {
  const { token, isAuthenticated, isChecking, isSigningIn, signIn, signOut } =
    useAdminSession()

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated || !token) {
    return (
      <>
        <AdminLogin onSignIn={signIn} isSigningIn={isSigningIn} />
        <Toaster position="top-center" richColors />
      </>
    )
  }

  return (
    <AdminTokenProvider token={token}>
      <ContentManager token={token} onSignOut={signOut} />
      <Toaster position="top-center" richColors />
    </AdminTokenProvider>
  )
}

function ContentManager({
  token,
  onSignOut,
}: {
  token: string
  onSignOut: () => void
}) {
  const stored = useQuery(api.content.getAll)
  const saveSection = useMutation(api.content.saveSection)
  const resetSection = useMutation(api.content.resetSection)

  const [drafts, setDrafts] = useState<Drafts>({})
  const [savingSections, setSavingSections] = useState<Array<SectionId>>([])
  const [activeTab, setActiveTab] = useState<SectionId>('hero')

  // What the site is currently serving: stored rows merged over the defaults.
  const savedContent = useMemo(() => resolveContent(stored), [stored])

  const dirtySections = useMemo(
    () =>
      SECTION_SCHEMAS.map((schema) => schema.id).filter((id) => {
        const draft = drafts[id]
        return draft !== undefined && !deepEqual(draft, savedContent[id])
      }),
    [drafts, savedContent],
  )

  // Closing the tab mid-edit should not silently drop work.
  useEffect(() => {
    if (dirtySections.length === 0) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirtySections.length])

  const valueFor = useCallback(
    (id: SectionId): SectionValue =>
      (drafts[id] ?? savedContent[id]) as SectionValue,
    [drafts, savedContent],
  )

  const save = useCallback(
    async (id: SectionId) => {
      const draft = drafts[id]
      if (!draft) return
      setSavingSections((current) => [...current, id])
      try {
        await saveSection({ token, section: id, data: draft })
        setDrafts((current) => {
          const next = { ...current }
          delete next[id]
          return next
        })
        toast.success(
          `${SECTION_SCHEMAS.find((s) => s.id === id)?.title} saved — it is live now.`,
        )
      } catch (error) {
        toast.error(errorMessage(error))
      } finally {
        setSavingSections((current) => current.filter((entry) => entry !== id))
      }
    },
    [drafts, saveSection, token],
  )

  const saveAll = useCallback(async () => {
    for (const id of dirtySections) {
      await save(id)
    }
  }, [dirtySections, save])

  const restoreDefaults = useCallback(
    async (id: SectionId) => {
      try {
        await resetSection({ token, section: id })
        setDrafts((current) => {
          const next = { ...current }
          delete next[id]
          return next
        })
        toast.success('Built-in content restored.')
      } catch (error) {
        toast.error(errorMessage(error))
      }
    },
    [resetSection, token],
  )

  if (stored === undefined) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      <header className="bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold">Landing page content</h1>
              <p className="text-muted-foreground text-sm">
                Edit each section, then submit it. Saved changes go live
                immediately.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  View site
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut data-icon="inline-start" />
                Sign out
              </Button>
            </div>
          </div>

          <UnsavedChangesBar
            dirtySections={dirtySections}
            isSaving={savingSections.length > 0}
            onJump={setActiveTab}
            onSaveAll={saveAll}
            onDiscardAll={() => setDrafts({})}
          />
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4 md:p-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as SectionId)}
          className="gap-6"
        >
          <ScrollArea className="w-full">
            <TabsList>
              {SECTION_SCHEMAS.map((schema) => (
                <TabsTrigger key={schema.id} value={schema.id}>
                  {schema.title}
                  {dirtySections.includes(schema.id) ? (
                    <span
                      aria-label="unsaved changes"
                      className="bg-primary ml-1.5 inline-block size-1.5 rounded-full"
                    />
                  ) : null}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {SECTION_SCHEMAS.map((schema) => (
            <TabsContent key={schema.id} value={schema.id}>
              <SectionEditor
                schema={schema}
                value={valueFor(schema.id)}
                isDirty={dirtySections.includes(schema.id)}
                isSaving={savingSections.includes(schema.id)}
                lastSavedAt={
                  (stored[schema.id] as { updatedAt: number } | undefined)
                    ?.updatedAt
                }
                onChange={(next) =>
                  setDrafts((current) => ({ ...current, [schema.id]: next }))
                }
                onSave={() => void save(schema.id)}
                onDiscard={() =>
                  setDrafts((current) => {
                    const next = { ...current }
                    delete next[schema.id]
                    return next
                  })
                }
                onRestoreDefaults={() => void restoreDefaults(schema.id)}
              />
            </TabsContent>
          ))}
        </Tabs>

        <Separator className="my-8" />
        <p className="text-muted-foreground pb-8 text-center text-xs">
          {SECTION_SCHEMAS.length} sections ·{' '}
          {Object.keys(DEFAULT_CONTENT).length} built-in defaults available as a
          fallback
        </p>
      </main>
    </div>
  )
}

/** The always-visible summary of everything not yet submitted. */
function UnsavedChangesBar({
  dirtySections,
  isSaving,
  onJump,
  onSaveAll,
  onDiscardAll,
}: {
  dirtySections: Array<SectionId>
  isSaving: boolean
  onJump: (id: SectionId) => void
  onSaveAll: () => void
  onDiscardAll: () => void
}) {
  if (dirtySections.length === 0) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-500" />
        Everything is saved.
      </div>
    )
  }

  return (
    <Alert>
      <CircleAlert />
      <AlertTitle>
        {dirtySections.length} section
        {dirtySections.length === 1 ? '' : 's'} with unsaved changes
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {dirtySections.map((id) => (
            <Button
              key={id}
              variant="secondary"
              size="xs"
              onClick={() => onJump(id)}
            >
              {SECTION_SCHEMAS.find((schema) => schema.id === id)?.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={onSaveAll} disabled={isSaving}>
            {isSaving ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <Save data-icon="inline-start" />
            )}
            Submit all
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Undo2 data-icon="inline-start" />
                Discard all
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard all unsaved edits?</AlertDialogTitle>
                <AlertDialogDescription>
                  Every change you have made since the last submit will be
                  thrown away across all {dirtySections.length} section
                  {dirtySections.length === 1 ? '' : 's'}. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep editing</AlertDialogCancel>
                <AlertDialogAction onClick={onDiscardAll}>
                  Discard all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AlertDescription>
    </Alert>
  )
}
