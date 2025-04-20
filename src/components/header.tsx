'use client'

import { css, useTheme } from '@emotion/react'
import Link from 'next/link'

const useStyles = () => {
  const theme = useTheme()

  return {
    container: css`
      position: relative;
      padding: 8px ${theme.tokens.padding.base};
      display: flex;
      justify-content: space-between;
      align-items: center;

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
    menu: css`
      margin: 0;
      display: flex;
      align-items: center;
      gap: 16px;
    `,
    menuItem: css`
      list-style-type: none;

      a {
        text-decoration: none;
        color: inherit;
      }
    `,
    menuItemActive: css`
      text-decoration: underline;
    `,
  }
}

const menuItems = [
  {
    id: 'home',
    path: '/',
    title: 'Illustrations',
  },
  {
    id: 'music',
    path: '/music',
    title: 'Music',
  },
] as const

export type MenuId = (typeof menuItems)[number]['id']

export type HeaderProps = {
  className?: string
  current?: MenuId
}

export function Header({ className, current }: HeaderProps) {
  const styles = useStyles()

  return (
    <header css={styles.container} className={className}>
      <h1 css={styles.title}>
        <Link href="/">n-at</Link>
      </h1>
      <nav>
        <ul css={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.id} css={css(styles.menuItem, current === item.id && styles.menuItemActive)}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
