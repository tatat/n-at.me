'use client'

import { css, useTheme } from '@emotion/react'
import { Header, type MenuId } from './header'
import { Footer } from './footer'

export type LayoutProps = {
  children: React.ReactNode
  current?: MenuId
}

const useStyles = () => {
  const theme = useTheme()

  return {
    container: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100lvh;
    `,
    top: css`
      flex: 1;
      display: flex;
      flex-direction: column;
    `,
    content: css`
      padding: 0 ${theme.tokens.padding.base};
      flex: 1;
      position: relative;

      @media (max-width: ${theme.breakpoints.small}) {
        padding: 0 ${theme.tokens.padding.small};
      }
    `,
  }
}

export function Layout({ children, current }: LayoutProps) {
  const styles = useStyles()

  return (
    <main css={styles.container}>
      <div css={styles.top}>
        <Header current={current} />
        <div css={styles.content}>{children}</div>
      </div>
      <Footer />
    </main>
  )
}
