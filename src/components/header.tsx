'use client'

import { css, useTheme } from '@emotion/react'
import Link from 'next/link'

const useStyles = () => {
  const theme = useTheme()

  return {
    container: css`
      position: relative;
      padding: 8px ${theme.tokens.padding.base};

      @media (max-width: ${theme.breakpoints.small}) {
        padding: 8px ${theme.tokens.padding.small};
      }
    `,
    title: css`
      font-size: 1.4rem;
      margin: 0;

      a {
        text-decoration: none;
      }
    `,
  }
}

export type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const styles = useStyles()

  return (
    <header css={styles.container} className={className}>
      <h1 css={styles.title}>
        <Link href="/">n-at</Link>
      </h1>
    </header>
  )
}
