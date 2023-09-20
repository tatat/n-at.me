import { useEffect, useRef, useState } from 'react'

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

export const useLoadImage = (src: string, minDelay = 0): HTMLImageElement | null => {
  const [image, setImage] = useState<HTMLImageElement>()
  const startRef = useRef(Date.now())

  useEffect(() => {
    loadImage(src).then((image) => {
      const elapsed = Date.now() - startRef.current

      if (elapsed < minDelay) {
        setTimeout(() => setImage(image), minDelay - elapsed)
      } else {
        setImage(image)
      }
    })
  }, [src, minDelay])

  return image ?? null
}
