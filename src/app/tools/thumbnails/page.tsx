'use client'

import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react'
import { css } from '@emotion/react'
import { Layout } from '@/components/layout'
import Link from 'next/link'
import {
  generateRandomFilename,
  resizeImageDimensions,
  calculateCenteredCropPosition,
  convertToGrayscaleWithContrast,
} from './utils'

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
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
  `,
  canvas: css`
    border: 1px solid #ddd;
    max-width: 100%;
    height: auto;
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

const cropSize = 480 // Fixed crop size as per requirements

export default function ThumbnailGenerator() {
  const [, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [filename, setFilename] = useState('')
  const [thumbnailReady, setThumbnailReady] = useState(false)
  const [contrast, setContrast] = useState(0) // Default contrast adjustment (0 = no change)

  const sourceCanvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generate thumbnail preview
  const generatePreview = useCallback(
    (x: number, y: number) => {
      try {
        if (!sourceCanvasRef.current || !previewCanvasRef.current) return

        const sourceCanvas = sourceCanvasRef.current
        const previewCanvas = previewCanvasRef.current
        const sourceCtx = sourceCanvas.getContext('2d')
        const previewCtx = previewCanvas.getContext('2d')

        if (!sourceCtx || !previewCtx) return

        // Make sure the crop coordinates are valid
        const validX = Math.max(0, Math.min(sourceCanvas.width - cropSize, x))
        const validY = Math.max(0, Math.min(sourceCanvas.height - cropSize, y))

        // Set preview canvas size (480x480 for the cropped area, doubled in width for side-by-side display)
        previewCanvas.width = cropSize
        previewCanvas.height = cropSize / 2 // Half scale as per requirements

        try {
          // Get the cropped image data - this can fail if coordinates are invalid
          const imageData = sourceCtx.getImageData(validX, validY, cropSize, cropSize)

          // Create a temporary canvas for the full-size concatenated image
          const tempCanvas = document.createElement('canvas')
          tempCanvas.width = cropSize * 2 // Double width for side-by-side
          tempCanvas.height = cropSize
          const tempCtx = tempCanvas.getContext('2d')

          if (!tempCtx) return

          // Draw the original cropped image on the left side
          tempCtx.putImageData(imageData, 0, 0)

          // Create grayscale version for the right side
          const grayscaleImageData = sourceCtx.getImageData(validX, validY, cropSize, cropSize)

          // Convert to grayscale with contrast adjustment
          convertToGrayscaleWithContrast(grayscaleImageData, contrast)

          // Draw the grayscale image on the right side
          tempCtx.putImageData(grayscaleImageData, cropSize, 0)

          // Draw the concatenated image onto the preview canvas at half scale
          previewCtx.drawImage(tempCanvas, 0, 0, cropSize * 2, cropSize, 0, 0, cropSize, cropSize / 2)

          // Mark that we have a valid preview
          setThumbnailReady(true)
        } catch (err) {
          console.error('Error generating preview:', err)
          setError('Failed to generate preview. Try adjusting the crop area.')
        }
      } catch (err) {
        console.error('Unexpected error in generatePreview:', err)
        setError('An unexpected error occurred. Please try again.')
      }
    },
    [contrast],
  )

  // Load image into canvas
  const loadImageIntoCanvas = useCallback(
    (url: string) => {
      if (!sourceCanvasRef.current) {
        console.error('Source canvas not available')
        return
      }

      const canvas = sourceCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        console.error('Canvas context not available')
        return
      }

      console.log('Loading image from URL:', url)
      const img = new Image()

      // Handle image loading errors
      img.onerror = (e) => {
        console.error('Error loading image:', e)
        setError('Failed to load image. The file might be corrupted or inaccessible.')
      }

      img.onload = () => {
        console.log('Image loaded successfully, dimensions:', img.width, 'x', img.height)
        try {
          // Resize image if needed
          const { width, height } = resizeImageDimensions(img.width, img.height)
          console.log('Resized dimensions:', width, 'x', height)

          // Set canvas size to the resized dimensions
          canvas.width = width
          canvas.height = height

          // Draw resized image on canvas
          ctx.drawImage(img, 0, 0, width, height)

          // Initialize crop position to center if possible
          const { x: newX, y: newY } = calculateCenteredCropPosition(width, height, cropSize)
          setCropPosition({ x: newX, y: newY })
          console.log('Initial crop position:', newX, newY)

          // Generate initial preview
          generatePreview(newX, newY)
        } catch (err) {
          console.error('Error processing image:', err)
          setError('Failed to process image. Please try another file.')
        }
      }

      // Set the source after setting up event handlers
      img.src = url
    },
    [generatePreview],
  )

  // Handle file selection
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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

      try {
        // Revoke previous URL if it exists and is a blob URL
        if (imageUrl && imageUrl.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(imageUrl)
          } catch (err) {
            console.error('Error revoking previous object URL:', err)
          }
        }

        // Create object URL for the image
        const url = URL.createObjectURL(file)

        // Check if URL is valid
        if (!url) {
          throw new Error('Failed to create object URL')
        }

        // Set the new URL
        setImageUrl(url)

        // Reset crop position and thumbnail state
        setCropPosition({ x: 0, y: 0 })
        setThumbnailReady(false)

        // Load the image into the canvas
        loadImageIntoCanvas(url)
      } catch (err) {
        console.error('Error creating object URL:', err)
        setError('Failed to load image. Please try again.')
      }
    },
    [imageUrl, loadImageIntoCanvas],
  )

  // Handle crop area dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sourceCanvasRef.current) return

      setIsDragging(true)

      // Calculate mouse position relative to the canvas
      const canvas = sourceCanvasRef.current
      const rect = canvas.getBoundingClientRect()

      // Calculate scale factor between displayed size and actual canvas size
      const scaleX = canvas.width / canvas.clientWidth
      const scaleY = canvas.height / canvas.clientHeight

      // Convert mouse position to canvas coordinates
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

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

      // Calculate scale factor between displayed size and actual canvas size
      const scaleX = canvas.width / canvas.clientWidth
      const scaleY = canvas.height / canvas.clientHeight

      // Convert mouse position to canvas coordinates
      const x = (e.clientX - rect.left) * scaleX - dragStart.x
      const y = (e.clientY - rect.top) * scaleY - dragStart.y

      // Constrain to canvas boundaries
      const newX = Math.max(0, Math.min(canvas.width - cropSize, x))
      const newY = Math.max(0, Math.min(canvas.height - cropSize, y))

      setCropPosition({ x: newX, y: newY })
      generatePreview(newX, newY)
    },
    [dragStart, generatePreview, isDragging],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle download
  const handleDownload = useCallback(() => {
    try {
      if (!thumbnailReady || !previewCanvasRef.current) return

      // Create a fresh blob URL at the time of download
      const previewCanvas = previewCanvasRef.current
      const dataUrl = previewCanvas.toDataURL('image/jpeg', 0.9)

      // Create download link
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${filename}.thumb.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // No need to revoke the dataUrl since it's not a blob URL
    } catch (err) {
      console.error('Error downloading thumbnail:', err)
      setError('Failed to download thumbnail. Please try again.')
    }
  }, [filename, thumbnailReady])

  // Reset everything
  const handleReset = useCallback(() => {
    // Revoke the URL if it exists and is a blob URL
    if (imageUrl && imageUrl.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(imageUrl)
      } catch (err) {
        console.error('Error revoking object URL:', err)
      }
    }

    setImageFile(null)
    setImageUrl(null)
    setThumbnailReady(false)
    setError(null)
    setFilename('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [imageUrl])

  // Handle window resize to update crop overlay
  const handleResize = useCallback(() => {
    // We just need to trigger a re-render, the crop overlay will be updated
    // because it uses the current canvas dimensions in its style calculation
    setCropPosition((prev) => ({ ...prev }))
  }, [])

  useEffect(() => {
    if (!imageUrl) return

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [imageUrl, handleResize])

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Revoke the URL if it exists and is a blob URL
      if (imageUrl && imageUrl.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(imageUrl)
        } catch (err) {
          console.error('Error revoking object URL:', err)
        }
      }
    }
  }, [imageUrl])

  // Handle random filename generation
  const handleGenerateRandomFilename = useCallback(() => {
    setFilename(generateRandomFilename())
  }, [])

  // Download original image handler
  const handleDownloadOriginal = useCallback(() => {
    try {
      if (!imageUrl || !sourceCanvasRef.current) return

      // Get the full canvas with the entire image
      const sourceCanvas = sourceCanvasRef.current

      // Create a fresh data URL at the time of download
      const dataUrl = sourceCanvas.toDataURL('image/jpeg', 1.0)

      // Create download link
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${filename}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // No need to revoke the dataUrl since it's not a blob URL
    } catch (err) {
      console.error('Error downloading original image:', err)
      setError('Failed to download original image. Please try again.')
    }
  }, [filename, imageUrl])

  // Handle contrast change
  const handleContrastChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const newContrast = parseInt(e.target.value, 10)
        setContrast(newContrast)
        // Update preview with new contrast
        generatePreview(cropPosition.x, cropPosition.y)
      } catch (err) {
        console.error('Error changing contrast:', err)
        setError('Failed to update contrast. Please try again.')
      }
    },
    [cropPosition.x, cropPosition.y, generatePreview],
  )

  // Handle filename change
  const handleFilenameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value)
  }, [])

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

        <div css={styles.canvasContainer} style={{ display: imageUrl ? 'flex' : 'none' }}>
          <h2>Original Image</h2>
          <p css={styles.instructions}>Drag the selection area to position the crop</p>

          <div css={styles.canvasWrapper} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <canvas ref={sourceCanvasRef} css={styles.canvas} />
            {sourceCanvasRef.current && (
              <div
                css={styles.cropOverlay}
                style={{
                  left: `${cropPosition.x * (sourceCanvasRef.current.clientWidth / sourceCanvasRef.current.width)}px`,
                  top: `${cropPosition.y * (sourceCanvasRef.current.clientHeight / sourceCanvasRef.current.height)}px`,
                  width: `${cropSize * (sourceCanvasRef.current.clientWidth / sourceCanvasRef.current.width)}px`,
                  height: `${cropSize * (sourceCanvasRef.current.clientHeight / sourceCanvasRef.current.height)}px`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
              />
            )}
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
              onChange={handleContrastChange}
              style={{ width: '100%', marginBottom: '15px' }}
            />
          </div>

          <canvas ref={previewCanvasRef} css={styles.previewCanvas} />

          <div css={styles.controlsContainer}>
            <input
              type="text"
              value={filename}
              onChange={handleFilenameChange}
              placeholder="Filename (without extension)"
              css={styles.filenameInput}
            />

            <button
              type="button"
              css={styles.button}
              onClick={handleGenerateRandomFilename}
              title="Generate random 3-character filename"
            >
              Random
            </button>

            <button type="button" css={styles.button} onClick={handleDownload} disabled={!thumbnailReady}>
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

        <div style={{ marginTop: '30px' }}>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </Layout>
  )
}
