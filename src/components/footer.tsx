'use client'

import { css } from '@emotion/react'
import Link from 'next/link'

const styles = {
  container: css`
    display: flex;
    gap: 1rem;
    justify-content: end;
    align-items: center;
    position: relative;
    padding: 8px 16px;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-end;
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

export type FooterProps = {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer css={styles.container} className={className}>
      <ul css={styles.links}>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://twitter.com/__________t_t_">
            X
          </Link>
        </li>
        <li>
          <Link rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/_tatat/">
            Instagram
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
      </ul>
      <small>&copy; {new Date().getFullYear()} tatあt</small>
    </footer>
  )
}
