'use client'

import { css } from '@emotion/react'
import { Header } from './header'
import { Footer } from './footer'

export type LayoutProps = {
  children: React.ReactNode
}

const styles = {
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
    padding: 0 16px;
    flex: 1;
    position: relative;
  `,
}

export function Layout({ children }: LayoutProps) {
  return (
    <main css={styles.container}>
      <div css={styles.top}>
        <Header />
        <div css={styles.content}>{children}</div>
      </div>
      <Footer />
    </main>
  )
}
