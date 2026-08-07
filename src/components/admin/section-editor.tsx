import { RotateCcw, Save, Undo2 } from 'lucide-react'
import { FieldControl } from './field-control'
import type { SectionSchema } from './section-schema'
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
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { FieldGroup } from '#/components/ui/field'
import { Spinner } from '#/components/ui/spinner'

type SectionValue = Record<string, unknown>

export function SectionEditor({
  schema,
  value,
  isDirty,
  isSaving,
  lastSavedAt,
  onChange,
  onSave,
  onDiscard,
  onRestoreDefaults,
}: {
  schema: SectionSchema
  value: SectionValue
  isDirty: boolean
  isSaving: boolean
  lastSavedAt?: number
  onChange: (next: SectionValue) => void
  onSave: () => void
  onDiscard: () => void
  onRestoreDefaults: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <CardTitle className="flex items-center gap-2 text-xl">
              {schema.title}
              {isDirty ? <Badge variant="secondary">Unsaved</Badge> : null}
              {value.enabled === false ? (
                <Badge variant="outline">Hidden</Badge>
              ) : null}
            </CardTitle>
            <CardDescription>{schema.description}</CardDescription>
          </div>
          {lastSavedAt ? (
            <p className="text-muted-foreground text-xs">
              Last saved {new Date(lastSavedAt).toLocaleString()}
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">
              Never edited — showing built-in content
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          {schema.fields.map((field) => (
            <FieldControl
              key={field.key}
              field={field}
              value={value[field.key]}
              idPrefix={schema.id}
              onChange={(next) => onChange({ ...value, [field.key]: next })}
            />
          ))}
        </FieldGroup>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t pt-6">
        <div className="flex flex-wrap gap-2">
          <Button onClick={onSave} disabled={!isDirty || isSaving}>
            {isSaving ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <Save data-icon="inline-start" />
            )}
            {isSaving ? 'Saving…' : 'Submit changes'}
          </Button>
          <Button variant="ghost" onClick={onDiscard} disabled={!isDirty}>
            <Undo2 data-icon="inline-start" />
            Discard
          </Button>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RotateCcw data-icon="inline-start" />
              Restore built-in content
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Restore the built-in {schema.title.toLowerCase()} content?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This deletes everything you have saved for this section and puts
                back the content the site originally shipped with. Uploaded
                images stay in your R2 bucket.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRestoreDefaults}>
                Restore
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
