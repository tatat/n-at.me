'use client'

import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react'
import { css } from '@emotion/react'
import { Layout } from '@/components/layout'
import Link from 'next/link'

const styles = {
  container: css`
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
  `,
  title: css`
    font-size: 24px;
    margin-bottom: 20px;
  `,
  description: css`
    margin-bottom: 20px;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  `,
  fileInput: css`
    margin-bottom: 10px;
  `,
  button: css`
    padding: 10px 15px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #333;
    }
    &:disabled {
      background-color: #999;
      cursor: not-allowed;
    }
  `,
  canvasContainer: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  `,
  canvasWrapper: css`
    position: relative;
    margin-bottom: 20px;
  `,
  canvas: css`
    border: 1px solid #ddd;
  `,
  cropOverlay: css`
    position: absolute;
    border: 2px dashed #fff;
    box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
    cursor: move;
  `,
  previewContainer: css`
    display: flex;
    gap: 20px;
    margin-top: 20px;
  `,
  previewCanvas: css`
    border: 1px solid #ddd;
  `,
  downloadButton: css`
    margin-top: 10px;
  `,
  errorMessage: css`
    color: red;
    margin-top: 10px;
  `,
  infoBox: css`
    background-color: #f5f5f5;
    padding: 15px 15px 20px 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  `,
  infoTitle: css`
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 10px;
  `,
  infoList: css`
    list-style-type: disc;
    margin: 0;
  `,
  infoItem: css`
    margin-bottom: 5px;
  `,
  infoItemLast: css``,
  instructions: css`
    margin-top: 10px;
    font-style: italic;
  `,
  controlsContainer: css`
    display: flex;
    gap: 10px;
    margin-top: 10px;
  `,
  filenameInput: css`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-grow: 1;
  `,
}

export default function ThumbnailGenerator() {
  const [, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [filename, setFilename] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [contrast, setContrast] = useState(0) // Default contrast adjustment (0 = no change)

  const sourceCanvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cropSize = 480 // Fixed crop size as per requirements

  // Apply contrast to a pixel value
  const applyContrast = useCallback((value: number, contrastValue: number): number => {
    // Normalize contrast from [-100, 100] to [-1, 1]
    const factor = (259 * (contrastValue + 255)) / (255 * (259 - contrastValue))

    // Apply contrast formula
    const newValue = factor * (value - 128) + 128

    // Clamp to [0, 255]
    return Math.max(0, Math.min(255, newValue))
  }, [])

  // Generate thumbnail preview
  const generatePreview = useCallback(
    (x: number, y: number) => {
      if (!sourceCanvasRef.current || !previewCanvasRef.current) return

      const sourceCanvas = sourceCanvasRef.current
      const previewCanvas = previewCanvasRef.current
      const sourceCtx = sourceCanvas.getContext('2d')
      const previewCtx = previewCanvas.getContext('2d')

      if (!sourceCtx || !previewCtx) return

      // Set preview canvas size (480x480 for the cropped area, doubled in width for side-by-side display)
      previewCanvas.width = cropSize
      previewCanvas.height = cropSize / 2 // Half scale as per requirements

      // Get the cropped image data
      const imageData = sourceCtx.getImageData(x, y, cropSize, cropSize)

      // Create a temporary canvas for the full-size concatenated image
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = cropSize * 2 // Double width for side-by-side
      tempCanvas.height = cropSize
      const tempCtx = tempCanvas.getContext('2d')

      if (!tempCtx) return

      // Draw the original cropped image on the left side
      tempCtx.putImageData(imageData, 0, 0)

      // Create grayscale version for the right side
      const grayscaleImageData = sourceCtx.getImageData(x, y, cropSize, cropSize)
      const data = grayscaleImageData.data

      // Convert to grayscale with contrast adjustment
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3

        // Apply contrast adjustment
        const adjustedValue = applyContrast(avg, contrast)

        data[i] = adjustedValue // R
        data[i + 1] = adjustedValue // G
        data[i + 2] = adjustedValue // B
        // data[i + 3] is alpha, unchanged
      }

      // Draw the grayscale image on the right side
      tempCtx.putImageData(grayscaleImageData, cropSize, 0)

      // Draw the concatenated image onto the preview canvas at half scale
      previewCtx.drawImage(tempCanvas, 0, 0, cropSize * 2, cropSize, 0, 0, cropSize, cropSize / 2)

      // Update thumbnail URL
      setThumbnailUrl(previewCanvas.toDataURL('image/jpeg', 0.9))
    },
    [applyContrast, contrast, cropSize],
  )

  // Handle file selection
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    setError(null)
    setImageFile(file)

    // Generate default filename (original filename without extension)
    const filenameParts = file.name.split('.')
    filenameParts.pop() // Remove extension
    const baseName = filenameParts.join('.')
    setFilename(baseName)

    // Create object URL for the image
    const url = URL.createObjectURL(file)
    setImageUrl(url)

    // Reset crop position and thumbnail
    setCropPosition({ x: 0, y: 0 })
    setThumbnailUrl(null)
  }, [])

  // Handle crop area dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sourceCanvasRef.current) return

      setIsDragging(true)

      // Calculate mouse position relative to the canvas
      const canvas = sourceCanvasRef.current
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Store the offset between mouse position and crop position
      setDragStart({
        x: x - cropPosition.x,
        y: y - cropPosition.y,
      })
    },
    [cropPosition],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !sourceCanvasRef.current) return

      // Calculate new position
      const canvas = sourceCanvasRef.current
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left - dragStart.x
      const y = e.clientY - rect.top - dragStart.y

      // Constrain to canvas boundaries
      const newX = Math.max(0, Math.min(canvas.width - cropSize, x))
      const newY = Math.max(0, Math.min(canvas.height - cropSize, y))

      setCropPosition({ x: newX, y: newY })
      generatePreview(newX, newY)
    },
    [cropSize, dragStart, generatePreview, isDragging],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle download
  const handleDownload = useCallback(() => {
    if (!thumbnailUrl) return

    const link = document.createElement('a')
    link.href = thumbnailUrl
    link.download = `${filename}.thumb.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [filename, thumbnailUrl])

  // Reset everything
  const handleReset = useCallback(() => {
    setImageFile(null)
    setImageUrl(null)
    setThumbnailUrl(null)
    setError(null)
    setFilename('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  // Load image into canvas when imageUrl changes
  useEffect(() => {
    if (!imageUrl || !sourceCanvasRef.current) return

    const canvas = sourceCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // Resize image if it's larger than 2560x2560
      const MAX_SIZE = 2560
      let width = img.width
      let height = img.height

      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = Math.round((height / width) * MAX_SIZE)
          width = MAX_SIZE
        } else {
          width = Math.round((width / height) * MAX_SIZE)
          height = MAX_SIZE
        }
      }

      // Set canvas size to the resized dimensions
      canvas.width = width
      canvas.height = height

      // Draw resized image on canvas
      ctx.drawImage(img, 0, 0, width, height)

      // Initialize crop position to center if possible
      const newX = Math.max(0, Math.floor((width - cropSize) / 2))
      const newY = Math.max(0, Math.floor((height - cropSize) / 2))
      setCropPosition({ x: newX, y: newY })

      // Generate initial preview
      generatePreview(newX, newY)
    }

    img.src = imageUrl

    // Clean up object URL when component unmounts or imageUrl changes
    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [cropSize, generatePreview, imageUrl])

  // Generate random 3-character filename
  const generateRandomFilename = useCallback(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 3; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFilename(result)
  }, [])

  // Download original image handler
  const handleDownloadOriginal = useCallback(() => {
    if (!imageUrl || !sourceCanvasRef.current) return

    // Get the full canvas with the entire image
    const sourceCanvas = sourceCanvasRef.current

    // Create a download link for the full image
    const link = document.createElement('a')
    link.href = sourceCanvas.toDataURL('image/jpeg', 1.0)
    link.download = `${filename}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [filename, imageUrl])

  return (
    <Layout>
      <div css={styles.container}>
        <h1 css={styles.title}>Thumbnail Generator</h1>

        <div css={styles.infoBox}>
          <h3 css={styles.infoTitle}>How it works</h3>
          <ul css={styles.infoList}>
            <li css={styles.infoItem}>Upload an image</li>
            <li css={styles.infoItem}>Drag the selection area to crop a 480x480 pixel region</li>
            <li css={styles.infoItem}>
              The tool will create a thumbnail with the original crop on the left and a grayscale version on the right
            </li>
            <li css={styles.infoItem}>The final thumbnail will be resized to half scale</li>
            <li css={styles.infoItemLast}>Download the thumbnail with the naming pattern: filename.thumb.jpg</li>
          </ul>
        </div>

        <form css={styles.form}>
          <div css={styles.fileInput}>
            <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
          </div>

          {error && <div css={styles.errorMessage}>{error}</div>}
        </form>

        {imageUrl && (
          <div css={styles.canvasContainer}>
            <h2>Original Image</h2>
            <p css={styles.instructions}>Drag the selection area to position the crop</p>

            <div css={styles.canvasWrapper} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
              <canvas ref={sourceCanvasRef} css={styles.canvas} />
              <div
                css={styles.cropOverlay}
                style={{
                  left: `${cropPosition.x}px`,
                  top: `${cropPosition.y}px`,
                  width: `${cropSize}px`,
                  height: `${cropSize}px`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
              />
            </div>

            <h2>Thumbnail Preview</h2>

            <div>
              <label htmlFor="contrast" style={{ display: 'block', marginBottom: '5px' }}>
                Grayscale Contrast: {contrast}
              </label>
              <input
                type="range"
                id="contrast"
                min="-100"
                max="100"
                value={contrast}
                onChange={(e) => {
                  const newContrast = parseInt(e.target.value, 10)
                  setContrast(newContrast)
                  // Update preview with new contrast
                  generatePreview(cropPosition.x, cropPosition.y)
                }}
                style={{ width: '100%', marginBottom: '15px' }}
              />
            </div>

            <canvas ref={previewCanvasRef} css={styles.previewCanvas} />

            <div css={styles.controlsContainer}>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Filename (without extension)"
                css={styles.filenameInput}
              />

              <button
                type="button"
                css={styles.button}
                onClick={generateRandomFilename}
                title="Generate random 3-character filename"
              >
                Random
              </button>

              <button type="button" css={styles.button} onClick={handleDownload} disabled={!thumbnailUrl}>
                Download Thumbnail
              </button>

              <button type="button" css={styles.button} onClick={handleDownloadOriginal} disabled={!imageUrl}>
                Download Original
              </button>

              <button type="button" css={styles.button} onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </Layout>
  )
}
