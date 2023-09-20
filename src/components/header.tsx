'use client'

import { css } from '@emotion/react'
import Link from 'next/link'

const styles = {
  container: css`
    position: relative;
    padding: 8px 16px;
  `,
  title: css`
    font-size: 1.4rem;
    margin: 0;

    a {
      text-decoration: none;
    }
  `,
}

export type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header css={styles.container} className={className}>
      <h1 css={styles.title}>
        <Link href="/">n-at</Link>
      </h1>
    </header>
  )
}
