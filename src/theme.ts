const breakpoints = {
  small: '390px',
  base: null,
}

type Breakpoint = keyof typeof breakpoints

const tokens = {
  padding: {
    small: '10px',
    base: '16px',
  },
} as const satisfies Record<string, Record<Breakpoint, number | string>>

export const theme = {
  breakpoints,
  tokens,
}

export type Theme = typeof theme
