'use client'

import { Layout } from '@/components/layout'
import { Thumbnail } from '@/components/thumbnail'
import { illustrations, categories } from '@/config/illustrations'
import { css } from '@emotion/react'
import Link from 'next/link'
import React from 'react'

const illustrationsByCategory = categories
  .map((category) => {
    return {
      category,
      illustrations: illustrations.filter((illustration) => illustration.category === category),
    }
  })
  .filter(({ illustrations }) => illustrations.length > 0)

const styles = (() => {
  const tile = css`
    aspect-ratio: 1 / 1;
    margin: 0;
    padding: 0;
    overflow: hidden;
  `

  return {
    tile,
    category: css`
      ${tile};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    `,
    illustration: css`
      ${tile};
      position: relative;
      border-radius: 3%;

      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
    content: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      grid-auto-rows: minmax(120px, 1fr);
      gap: 10px;

      @supports not (aspect-ratio: 1 / 1) {
        grid-template-columns: repeat(auto-fill, 120px);
        grid-auto-rows: 120px;
      }
    `,
  }
})()

export function HomeContent() {
  return (
    <Layout current="home">
      <div css={styles.content}>
        {illustrationsByCategory.map(({ category, illustrations: items }) => (
          <React.Fragment key={category}>
            <h2 css={styles.category}>{category}</h2>
            {items.map((illustration) => (
              <div key={illustration.primaryKey} css={styles.illustration}>
                <Link href={`/i/${illustration.primaryKey}`}>
                  <Thumbnail src={illustration.thumbnailImagePath} alt={illustration.title} />
                </Link>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Layout>
  )
}
