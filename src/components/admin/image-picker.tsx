import { useQuery } from 'convex/react'
import { useRef, useState } from 'react'
import { ImageIcon, LinkIcon, Trash2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import { useAdminToken } from './admin-context'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Input } from '#/components/ui/input'
import { Progress } from '#/components/ui/progress'
import { ScrollArea } from '#/components/ui/scroll-area'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { Spinner } from '#/components/ui/spinner'
import { cn } from '#/lib/utils'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  useImageUpload,
} from '#/hooks/use-image-upload'

const ASPECT_CLASS = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
} as const

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong.'
}

/** Upload / library / paste-a-URL picker. Returns the chosen public URL. */
export function ImagePickerDialog({
  folder,
  onSelect,
  trigger,
}: {
  folder: string
  onSelect: (url: string) => void
  trigger: React.ReactNode
}) {
  const token = useAdminToken()
  const [open, setOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [manualUrl, setManualUrl] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { upload, progress, isUploading } = useImageUpload(token)

  const assets = useQuery(
    api.media.listAssets,
    open ? { token: token ?? undefined } : 'skip',
  )

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    try {
      const url = await upload(file, folder)
      onSelect(url)
      setOpen(false)
      toast.success('Image uploaded to Cloudflare R2.')
    } catch (error) {
      toast.error(errorMessage(error))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose an image</DialogTitle>
          <DialogDescription>
            Uploads go straight to your Cloudflare R2 bucket.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload">
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="url">Paste URL</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="pt-4">
            <div
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault()
                setIsDragging(false)
                void handleFiles(event.dataTransfer.files)
              }}
              className={cn(
                'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition-colors',
                isDragging ? 'border-primary bg-primary/5' : 'border-border',
              )}
            >
              {isUploading ? (
                <div className="flex w-full max-w-xs flex-col items-center gap-3">
                  <Spinner />
                  <Progress value={progress ?? 0} />
                  <p className="text-muted-foreground text-sm">
                    Uploading… {progress ?? 0}%
                  </p>
                </div>
              ) : (
                <>
                  <UploadCloud className="text-muted-foreground size-8" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Drop an image here</p>
                    <p className="text-muted-foreground text-sm">
                      JPG, PNG, WebP, AVIF, GIF or SVG — up to{' '}
                      {MAX_UPLOAD_BYTES / 1024 / 1024} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                  >
                    Browse files
                  </Button>
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    onChange={(event) => {
                      void handleFiles(event.target.files)
                      event.target.value = ''
                    }}
                  />
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="library" className="pt-4">
            {assets === undefined ? (
              <div className="flex justify-center py-10">
                <Spinner />
              </div>
            ) : assets.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <ImageIcon />
                  </EmptyMedia>
                  <EmptyTitle>No uploads yet</EmptyTitle>
                  <EmptyDescription>
                    Images you upload through the CMS show up here for reuse.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ScrollArea className="h-80">
                <div className="grid grid-cols-3 gap-3 pr-3 sm:grid-cols-4">
                  {assets.map((asset) => (
                    <button
                      key={asset._id}
                      type="button"
                      title={asset.fileName}
                      onClick={() => {
                        onSelect(asset.url)
                        setOpen(false)
                      }}
                      className="border-border hover:border-primary focus-visible:ring-ring aspect-square overflow-hidden rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <img
                        src={asset.url}
                        alt={asset.fileName}
                        className="size-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="url" className="flex flex-col gap-3 pt-4">
            <Input
              value={manualUrl}
              dir="ltr"
              placeholder="https://example.com/photo.jpg"
              onChange={(event) => setManualUrl(event.target.value)}
            />
            <p className="text-muted-foreground text-sm">
              Use this to keep an image that is already hosted elsewhere.
            </p>
            <Button
              className="self-start"
              disabled={!manualUrl.trim()}
              onClick={() => {
                onSelect(manualUrl.trim())
                setManualUrl('')
                setOpen(false)
              }}
            >
              <LinkIcon data-icon="inline-start" />
              Use this URL
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

/** Single-image control: preview, replace, remove. */
export function ImageField({
  value,
  onChange,
  folder,
  aspect = 'square',
}: {
  value: string
  onChange: (url: string) => void
  folder: string
  aspect?: keyof typeof ASPECT_CLASS
}) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <div
        className={cn(
          'bg-muted border-border w-40 shrink-0 overflow-hidden rounded-lg border',
          ASPECT_CLASS[aspect],
        )}
      >
        {value ? (
          <img src={value} alt="" className="size-full object-cover" />
        ) : (
          <div className="text-muted-foreground flex size-full items-center justify-center">
            <ImageIcon />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <ImagePickerDialog
            folder={folder}
            onSelect={onChange}
            trigger={
              <Button variant="outline" size="sm">
                <UploadCloud data-icon="inline-start" />
                {value ? 'Replace' : 'Add image'}
              </Button>
            }
          />
          {value ? (
            <Button variant="ghost" size="sm" onClick={() => onChange('')}>
              <Trash2 data-icon="inline-start" />
              Remove
            </Button>
          ) : null}
        </div>
        {value ? (
          <p
            dir="ltr"
            className="text-muted-foreground max-w-md truncate font-mono text-xs"
          >
            {value}
          </p>
        ) : null}
      </div>
    </div>
  )
}
