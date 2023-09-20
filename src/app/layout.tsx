import 'normalize.css'
import './globals.scss'
import type { Metadata } from 'next'
import { Mulish, Sawarabi_Gothic } from 'next/font/google'
import EmotionRootStyleRegistry from './emotion-root-style-registry'

const fontMulish = Mulish({ subsets: ['latin'], variable: '--font-mulish' })
const fontSawarabiGothic = Sawarabi_Gothic({ weight: '400', subsets: ['latin'], variable: '--font-sawarabi-gothic' })

export const metadata: Metadata = {
  title: 'n-at',
  description: 'n-at',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${fontMulish.variable} ${fontSawarabiGothic.variable}`}>
        <EmotionRootStyleRegistry>{children}</EmotionRootStyleRegistry>
      </body>
    </html>
  )
}
