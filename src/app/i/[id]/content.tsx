'use client'

import { css, keyframes } from '@emotion/react'
import Link from 'next/link'
import type { Props } from './types'
import { Layout } from '@/components/layout'
import { useLoadImage } from '@/hooks/use-load-image'
import loadingImage from '@/assets/loading.svg'

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
    animation: ${fadeIn} 0.2s ease 0s forwards;
    opacity: 0;
  `,
  info: css`
    position: relative;
    animation: ${fadeIn} 0.2s ease 0.1s forwards;
    opacity: 0;
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
  link: css`
    overflow-wrap: break-word;
  `,
  loading: css`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9;
    width: 64px;
    height: 64px;
    display: block;
    transform: translate(-50%, -50%);
  `,
}

export function IllustrationContent({ illustration: { imagePath, title, links = [] } }: Props) {
  const image = useLoadImage(imagePath, 400)

  return (
    <Layout>
      {image ? (
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
                    <Link css={styles.link} href={link} rel="noopener noreferrer" target="_blank">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <img css={styles.loading} src={loadingImage.src} alt="Loading..." />
      )}
    </Layout>
  )
}
