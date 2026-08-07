import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from 'lucide-react'
import { GalleryField } from './gallery-field'
import { ImageField } from './image-picker'
import type { AdminField } from './section-schema'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Button } from '#/components/ui/button'
import { ButtonGroup } from '#/components/ui/button-group'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Switch } from '#/components/ui/switch'
import { Textarea } from '#/components/ui/textarea'
import { newId } from '#/lib/site-content'
import type { Localized } from '#/lib/site-content'

type Row = Record<string, unknown>

/** The English/Arabic pair every translatable field renders as. */
function LocalizedInputs({
  value,
  onChange,
  multiline,
  id,
}: {
  value: Localized | undefined
  onChange: (next: Localized) => void
  multiline?: boolean
  id: string
}) {
  const current = value ?? { en: '', ar: '' }
  const Control = multiline ? Textarea : Input

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <FieldLabel
          htmlFor={`${id}-en`}
          className="text-muted-foreground text-xs font-medium uppercase"
        >
          English
        </FieldLabel>
        <Control
          id={`${id}-en`}
          dir="ltr"
          rows={multiline ? 4 : undefined}
          value={current.en}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => onChange({ ...current, en: event.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <FieldLabel
          htmlFor={`${id}-ar`}
          className="text-muted-foreground text-xs font-medium uppercase"
        >
          العربية
        </FieldLabel>
        <Control
          id={`${id}-ar`}
          dir="rtl"
          rows={multiline ? 4 : undefined}
          value={current.ar}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => onChange({ ...current, ar: event.target.value })}
        />
      </div>
    </div>
  )
}

function RepeaterRows({
  field,
  rows,
  onChange,
  idPrefix,
}: {
  field: Extract<AdminField, { kind: 'repeater' }>
  rows: Array<Row>
  onChange: (next: Array<Row>) => void
  idPrefix: string
}) {
  const move = (index: number, delta: number) => {
    const target = index + delta
    if (target < 0 || target >= rows.length) return
    const next = [...rows]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    onChange(next)
  }

  const rowTitle = (row: Row, index: number) => {
    const raw = field.titleKey ? row[field.titleKey] : undefined
    if (typeof raw === 'string' && raw.trim()) return raw
    if (raw && typeof raw === 'object') {
      const localized = raw as Localized
      if (localized.en.trim()) return localized.en
      if (localized.ar.trim()) return localized.ar
    }
    return `Item ${index + 1}`
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.length > 0 ? (
        <Accordion type="multiple" className="flex flex-col gap-2">
          {rows.map((row, index) => {
            const rowId = String(row.id ?? index)
            return (
              <AccordionItem
                key={rowId}
                value={rowId}
                className="border-border rounded-lg border px-4 last:border-b"
              >
                <div className="flex items-center gap-2">
                  <AccordionTrigger className="flex-1 text-left">
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-muted-foreground font-mono text-xs">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{rowTitle(row, index)}</span>
                    </span>
                  </AccordionTrigger>
                  <ButtonGroup className="shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Move up"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Move down"
                      disabled={index === rows.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Duplicate"
                      onClick={() => {
                        const next = [...rows]
                        next.splice(index + 1, 0, {
                          ...structuredClone(row),
                          id: newId('item'),
                        })
                        onChange(next)
                      }}
                    >
                      <Copy />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Remove"
                      onClick={() =>
                        onChange(rows.filter((_, i) => i !== index))
                      }
                    >
                      <Trash2 />
                    </Button>
                  </ButtonGroup>
                </div>

                <AccordionContent className="pb-6">
                  <FieldGroup className="gap-5">
                    {field.fields.map((child) => (
                      <FieldControl
                        key={child.key}
                        field={child}
                        value={row[child.key]}
                        idPrefix={`${idPrefix}-${rowId}`}
                        onChange={(next) => {
                          const updated = [...rows]
                          updated[index] = { ...row, [child.key]: next }
                          onChange(updated)
                        }}
                      />
                    ))}
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      ) : (
        <p className="text-muted-foreground border-border rounded-lg border border-dashed p-6 text-center text-sm">
          Nothing here yet.
        </p>
      )}

      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => onChange([...rows, field.createItem()])}
      >
        <Plus data-icon="inline-start" />
        {field.addLabel}
      </Button>
    </div>
  )
}

/** Renders one schema field. Repeaters recurse back into this component. */
export function FieldControl({
  field,
  value,
  onChange,
  idPrefix,
}: {
  field: AdminField
  value: unknown
  onChange: (next: unknown) => void
  idPrefix: string
}) {
  const id = `${idPrefix}-${field.key}`

  if (field.kind === 'switch') {
    return (
      <Field orientation="horizontal">
        <FieldLabel htmlFor={id}>
          {field.label}
          {field.description ? (
            <FieldDescription>{field.description}</FieldDescription>
          ) : null}
        </FieldLabel>
        <Switch
          id={id}
          checked={value !== false}
          onCheckedChange={(checked) => onChange(checked)}
        />
      </Field>
    )
  }

  if (field.kind === 'repeater') {
    return (
      <FieldSet className="border-border gap-4 rounded-lg border p-4">
        <FieldLegend variant="label">{field.label}</FieldLegend>
        {field.description ? (
          <FieldDescription>{field.description}</FieldDescription>
        ) : null}
        <RepeaterRows
          field={field}
          rows={(value as Array<Row> | undefined) ?? []}
          onChange={(next) => onChange(next)}
          idPrefix={id}
        />
      </FieldSet>
    )
  }

  if (field.kind === 'gallery') {
    return (
      <Field>
        <FieldLabel>{field.label}</FieldLabel>
        {field.description ? (
          <FieldDescription>{field.description}</FieldDescription>
        ) : null}
        <GalleryField
          value={
            value as Array<{ id: string; url: string; alt?: string }> | undefined
          }
          onChange={(next) => onChange(next)}
          folder={field.folder}
          withAlt={field.withAlt}
        />
      </Field>
    )
  }

  if (field.kind === 'image') {
    return (
      <Field>
        <FieldLabel>{field.label}</FieldLabel>
        {field.description ? (
          <FieldDescription>{field.description}</FieldDescription>
        ) : null}
        <ImageField
          value={(value as string | undefined) ?? ''}
          onChange={(next) => onChange(next)}
          folder={field.folder}
          aspect={field.aspect}
        />
      </Field>
    )
  }

  if (field.kind === 'localized') {
    return (
      <Field>
        <FieldLabel>{field.label}</FieldLabel>
        {field.description ? (
          <FieldDescription>{field.description}</FieldDescription>
        ) : null}
        <LocalizedInputs
          id={id}
          value={value as Localized}
          multiline={field.multiline}
          onChange={(next) => onChange(next)}
        />
      </Field>
    )
  }

  // text | url
  return (
    <Field>
      <FieldLabel htmlFor={id}>{field.label}</FieldLabel>
      <Input
        id={id}
        dir={field.kind === 'url' ? 'ltr' : (field.dir ?? undefined)}
        type={field.kind === 'url' ? 'url' : 'text'}
        placeholder={field.placeholder}
        value={(value as string | undefined) ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
      {field.description ? (
        <FieldDescription>{field.description}</FieldDescription>
      ) : null}
    </Field>
  )
}
