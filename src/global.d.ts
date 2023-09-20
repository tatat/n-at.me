import { CSSProperties as _CSSProperties } from 'react'
import '@emotion/react'
import type { Theme as _Theme } from './theme'

declare module 'react' {
  interface CSSProperties extends _CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare module '@emotion/react' {
  export interface Theme extends _Theme {}
}
