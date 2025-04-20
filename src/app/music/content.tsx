'use client'

import { Layout } from '@/components/layout'
import { css } from '@emotion/react'

export function MusicContent() {
  return (
    <Layout current="music">
      <iframe
        css={css`
          aspect-ratio: 16 / 9;
          width: 100%;
          height: auto;
        `}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/videoseries?si=kK6GaFSPBUom2lrM&list=PLIA1sQUqXmoo9WhSXa0QNIo05juIGnZer"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Layout>
  )
}
