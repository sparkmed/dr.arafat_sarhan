import { useAction, useMutation } from 'convex/react'
import { useCallback, useState } from 'react'
import { api } from '../../convex/_generated/api'

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024 // 8 MB
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
]

/** PUTs the file to R2 and reports progress. Resolves once R2 has the bytes. */
function putWithProgress(
  url: string,
  file: File,
  onProgress: (percent: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('PUT', url, true)
    request.setRequestHeader('Content-Type', file.type)

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    }
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve()
      } else {
        reject(
          new Error(
            `Cloudflare R2 rejected the upload (${request.status}). Check the bucket CORS rules.`,
          ),
        )
      }
    }
    request.onerror = () =>
      reject(
        new Error(
          'Upload failed to reach Cloudflare R2. Check your connection and the bucket CORS rules.',
        ),
      )
    request.send(file)
  })
}

/**
 * Direct-to-R2 upload: Convex mints a presigned PUT URL, the browser sends the
 * bytes straight to Cloudflare, then we record the asset for the media library.
 */
export function useImageUpload(token: string | null) {
  const getUploadUrl = useAction(api.media.getUploadUrl)
  const recordAsset = useMutation(api.media.recordAsset)
  const [progress, setProgress] = useState<number | null>(null)

  const upload = useCallback(
    async (file: File, folder: string): Promise<string> => {
      if (!token) throw new Error('Your session expired. Please sign in again.')
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        throw new Error(
          `"${file.type || 'unknown type'}" is not a supported image format.`,
        )
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error(
          `That image is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is ${MAX_UPLOAD_BYTES / 1024 / 1024} MB.`,
        )
      }

      setProgress(0)
      try {
        const { uploadUrl, publicUrl, key } = await getUploadUrl({
          token,
          fileName: file.name,
          contentType: file.type,
          folder,
        })
        await putWithProgress(uploadUrl, file, setProgress)
        await recordAsset({
          token,
          key,
          url: publicUrl,
          fileName: file.name,
          contentType: file.type,
          folder,
        })
        return publicUrl
      } finally {
        setProgress(null)
      }
    },
    [getUploadUrl, recordAsset, token],
  )

  return { upload, progress, isUploading: progress !== null }
}
