'use client'

import { css } from '@emotion/react'

export type ThumbnailProps = {
  className?: string
  src: string
  alt: string
}

const style = css`
  --background-image: unset;

  position: relative;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    content: '';
    display: block;
    background-image: var(--background-image);
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.4s ease-in 0s;
  }

  &:before {
    background-position: 0;
    opacity: 0.2;
  }

  &:after {
    background-position: 100%;
    mix-blend-mode: lighten;
    opacity: 0.5;
  }

  &:hover:before {
    opacity: 1;
  }

  &:hover:after {
    opacity: 0;
  }
`

export function Thumbnail({ className, src, alt }: ThumbnailProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      css={style}
      style={{ '--background-image': `url(${src})` }}
      className={className}
    />
  )
}
