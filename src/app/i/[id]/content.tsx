'use client'

import { css, keyframes } from '@emotion/react'
import Link from 'next/link'
import type { Props } from './types'
import { Layout } from '@/components/layout'
import { useLoadImage } from '@/hooks/use-load-image'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const styles = {
  imageContainer: css`
    display: block;
  `,
  image: css`
    width: 100%;
    display: block;
    animation: ${fadeIn} 0.2s 0s ease forwards;
    opacity: 0;
  `,
  info: css`
    position: relative;
  `,
  title: css`
    margin: 16px 0;
  `,
  links: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: square inside none;
  `,
}

export function IllustrationContent({ illustration: { imagePath, title, links = [] } }: Props) {
  const image = useLoadImage(imagePath)

  return (
    <Layout>
      {image && (
        <>
          <Link css={styles.imageContainer} href="/">
            <img css={styles.image} src={image.src} alt={title} />
          </Link>
          <div css={styles.info}>
            <h2 css={styles.title}>{title}</h2>
            {links.length > 0 && (
              <ul css={styles.links}>
                {links.map((link) => (
                  <li key={link}>
                    <Link href={link} rel="noopener noreferrer" target="_blank">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </Layout>
  )
}
