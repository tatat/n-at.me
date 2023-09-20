import { CSSProperties as _CSSProperties } from 'react'

declare module 'react' {
  interface CSSProperties extends _CSSProperties {
    [key: `--${string}`]: string | number
  }
}
