import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ImageIcon, Trash2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import { useAdminToken } from './admin-context'
import { ImagePickerDialog } from './image-picker'
import { Button } from '#/components/ui/button'
import { ButtonGroup } from '#/components/ui/button-group'
import { Input } from '#/components/ui/input'
import { Progress } from '#/components/ui/progress'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { newId } from '#/lib/site-content'
import { ACCEPTED_IMAGE_TYPES, useImageUpload } from '#/hooks/use-image-upload'

type GalleryItem = { id: string; url: string; alt?: string }

/** Ordered multi-image control with batch upload and reordering. */
export function GalleryField({
  value,
  onChange,
  folder,
  withAlt = false,
}: {
  value: Array<GalleryItem> | undefined
  onChange: (next: Array<GalleryItem>) => void
  folder: string
  withAlt?: boolean
}) {
  const token = useAdminToken()
  const { upload, progress, isUploading } = useImageUpload(token)
  const [batch, setBatch] = useState<{ done: number; total: number } | null>(
    null,
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const items = value ?? []

  const append = (url: string) =>
    onChange([...items, { id: newId('img'), url, ...(withAlt ? { alt: '' } : {}) }])

  const uploadMany = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const list = Array.from(files)
    const uploaded: Array<GalleryItem> = []
    setBatch({ done: 0, total: list.length })
    try {
      for (const [index, file] of list.entries()) {
        try {
          const url = await upload(file, folder)
          uploaded.push({
            id: newId('img'),
            url,
            ...(withAlt ? { alt: '' } : {}),
          })
        } catch (error) {
          toast.error(
            `${file.name}: ${error instanceof Error ? error.message : 'upload failed'}`,
          )
        }
        setBatch({ done: index + 1, total: list.length })
      }
      if (uploaded.length) {
        onChange([...items, ...uploaded])
        toast.success(
          `Uploaded ${uploaded.length} image${uploaded.length === 1 ? '' : 's'}.`,
        )
      }
    } finally {
      setBatch(null)
    }
  }

  const move = (index: number, delta: number) => {
    const target = index + delta
    if (target < 0 || target >= items.length) return
    const next = [...items]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isUploading || !!batch}
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud data-icon="inline-start" />
          Upload images
        </Button>
        <ImagePickerDialog
          folder={folder}
          onSelect={append}
          trigger={
            <Button variant="ghost" size="sm">
              <ImageIcon data-icon="inline-start" />
              Add from library
            </Button>
          }
        />
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={(event) => {
            void uploadMany(event.target.files)
            event.target.value = ''
          }}
        />
      </div>

      {batch ? (
        <div className="flex flex-col gap-2">
          <Progress
            value={
              ((batch.done + (progress ?? 0) / 100) / batch.total) * 100
            }
          />
          <p className="text-muted-foreground text-sm">
            Uploading {batch.done + 1} of {batch.total}…
          </p>
        </div>
      ) : null}

      {items.length === 0 ? (
        <Empty className="border-border rounded-lg border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ImageIcon />
            </EmptyMedia>
            <EmptyTitle>No images yet</EmptyTitle>
            <EmptyDescription>
              Upload photos or pick ones you have already uploaded.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="border-border flex flex-col gap-2 rounded-lg border p-2"
            >
              <div className="bg-muted aspect-square overflow-hidden rounded-md">
                <img src={item.url} alt="" className="size-full object-cover" />
              </div>
              {withAlt ? (
                <Input
                  value={item.alt ?? ''}
                  placeholder="Alt text"
                  className="h-8"
                  onChange={(event) => {
                    const next = [...items]
                    next[index] = { ...item, alt: event.target.value }
                    onChange(next)
                  }}
                />
              ) : null}
              <div className="flex items-center justify-between gap-1">
                <ButtonGroup>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Move earlier"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Move later"
                    disabled={index === items.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowRight />
                  </Button>
                </ButtonGroup>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove image"
                  onClick={() =>
                    onChange(items.filter((entry) => entry.id !== item.id))
                  }
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
