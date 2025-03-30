import { useEffect, useRef, useState } from 'react'
import { loadImage } from '../utils/image'

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
