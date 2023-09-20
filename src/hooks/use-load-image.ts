import { useEffect, useState } from 'react'

const loadImage = (src: string): Promise<HTMLImageElement> => {
  const image = new Image()

  image.src = src

  if (image.complete) {
    return Promise.resolve(image)
  }

  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error(`Failed to load image ${src}`))
    }
  })
}

export const useLoadImage = (src: string): HTMLImageElement | null => {
  const [image, setImage] = useState<HTMLImageElement>()

  useEffect(() => {
    loadImage(src).then(setImage)
  }, [src])

  return image ?? null
}
