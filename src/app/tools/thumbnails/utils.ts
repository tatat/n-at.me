/**
 * Apply contrast adjustment to a pixel value
 * @param value - The pixel value to adjust (0-255)
 * @param contrastValue - The contrast adjustment value (-100 to 100)
 * @param slopeFactor - The contrast slope factor (default: 259)
 * @returns The adjusted pixel value (0-255)
 * @throws Error if slopeFactor is invalid (must be > 100 to avoid division by zero)
 */
export const applyContrast = (value: number, contrastValue: number, slopeFactor: number = 259): number => {
  // Validate slopeFactor
  if (!Number.isFinite(slopeFactor)) {
    throw new Error('slopeFactor must be a finite number')
  }

  if (slopeFactor <= 100) {
    throw new Error('slopeFactor must be greater than 100 to avoid division by zero')
  }

  // Normalize contrast from [-100, 100] to [-1, 1]
  const factor = (slopeFactor * (contrastValue + 255)) / (255 * (slopeFactor - contrastValue))

  // Apply contrast formula
  const newValue = factor * (value - 128) + 128

  // Clamp to [0, 255]
  return Math.max(0, Math.min(255, newValue))
}

/**
 * Generate a random 3-character filename
 * @returns A random 3-character string
 */
export const generateRandomFilename = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Resize an image if it exceeds maximum dimensions
 * @param width - Original image width
 * @param height - Original image height
 * @param maxSize - Maximum allowed dimension
 * @returns Object containing the resized width and height
 */
export const resizeImageDimensions = (
  width: number,
  height: number,
  maxSize: number = 2560,
): { width: number; height: number } => {
  if (width <= maxSize && height <= maxSize) {
    return { width, height }
  }

  if (width > height) {
    height = Math.round((height / width) * maxSize)
    width = maxSize
  } else {
    width = Math.round((width / height) * maxSize)
    height = maxSize
  }

  return { width, height }
}

/**
 * Calculate the initial crop position centered on the image
 * @param width - Image width
 * @param height - Image height
 * @param cropSize - Size of the crop area
 * @returns Object containing the x and y coordinates for the crop
 */
export const calculateCenteredCropPosition = (
  width: number,
  height: number,
  cropSize: number,
): { x: number; y: number } => {
  const x = Math.max(0, Math.floor((width - cropSize) / 2))
  const y = Math.max(0, Math.floor((height - cropSize) / 2))
  return { x, y }
}

/**
 * Convert an image region to grayscale with contrast adjustment
 * @param imageData - The ImageData object to process
 * @param contrast - The contrast adjustment value (-100 to 100)
 * @param slopeFactor - The contrast slope factor (default: 259)
 * @returns The processed ImageData object
 */
export const convertToGrayscaleWithContrast = (
  imageData: ImageData,
  contrast: number,
  slopeFactor: number = 259,
): ImageData => {
  const data = imageData.data

  // Convert to grayscale with contrast adjustment
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3

    // Apply contrast adjustment with the specified slope factor
    const adjustedValue = applyContrast(avg, contrast, slopeFactor)

    data[i] = adjustedValue // R
    data[i + 1] = adjustedValue // G
    data[i + 2] = adjustedValue // B
    // data[i + 3] is alpha, unchanged
  }

  return imageData
}
