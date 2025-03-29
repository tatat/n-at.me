'use client'

import { css, useTheme } from '@emotion/react'
import Link from 'next/link'

const useStyles = () => {
  const theme = useTheme()

  return {
    container: css`
      display: flex;
      gap: 1rem;
      justify-content: end;
      align-items: center;
      position: relative;
      padding: 8px ${theme.tokens.padding.small};

      @media (max-width: ${theme.breakpoints.small}) {
        flex-direction: column;
        align-items: flex-end;
        padding: 8px ${theme.tokens.padding.small};
      }
    `,
    links: css`
      display: flex;
      gap: 1rem;
      margin: 0;
      padding: 0;
      list-style: none;

      a {
        display: inline-block;
      }
    `,
  }
}

export type FooterProps = {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const styles = useStyles()

  return (
    <footer css={styles.container} className={className}>
      <ul css={styles.links}>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://x.com/__________t_t_">
            X
          </Link>
        </li>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/_tatat/">
            Instagram
          </Link>
        </li>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/@t-at-at">
            YouTube
          </Link>
        </li>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://soundcloud.com/tataaat">
            SoundCloud
          </Link>
        </li>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://github.com/tatat">
            GitHub
          </Link>
        </li>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://ponponcreamsoda.web.app/">
            Pon Pon Creamsoda
          </Link>
        </li>
      </ul>
      <small>&copy; {new Date().getFullYear()} tatあt</small>
    </footer>
  )
}
