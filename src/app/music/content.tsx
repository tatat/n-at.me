'use client'

import { Layout } from '@/components/layout'
import { css } from '@emotion/react'

const styles = {
  containerMain: css`
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 0 auto;
    max-width: 1024px;

    > :first-child {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    @media (max-width: 1024px) {
      grid-template-rows: 1fr auto auto;
      grid-template-columns: 1fr;

      > * {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  `,
  containerSubWrapper: css`
    max-width: 1024px;
    padding: 16px;
    background-color: #000000;
    margin: 32px auto 0 auto;
    border-radius: 4px;
  `,
  containerSub: css`
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;

    @media (max-width: 1024px) {
      grid-template-rows: 1fr auto auto;
      grid-template-columns: 1fr;

      > * {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  `,
}

export function MusicContent() {
  return (
    <Layout current="music">
      <div css={styles.containerMain}>
        <div>
          <iframe
            css={css`
              aspect-ratio: 16 / 9;
              width: 100%;
              height: auto;
              border-style: none;
            `}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/videoseries?si=kK6GaFSPBUom2lrM&list=PLIA1sQUqXmoo9WhSXa0QNIo05juIGnZer"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <iframe
            css={css`
              border-style: none;
            `}
            width="100%"
            height="360"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2011679634&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div
            css={css`
              font-size: 10px;
              color: #cccccc;
              line-break: anywhere;
              word-break: normal;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family:
                Interstate,
                Lucida Grande,
                Lucida Sans Unicode,
                Lucida Sans,
                Garuda,
                Verdana,
                Tahoma,
                sans-serif;
              font-weight: 100;
            `}
          >
            <a
              href="https://soundcloud.com/tataaat"
              title="tataaat"
              target="_blank"
              css={css`
                color: #cccccc;
                text-decoration: none;
              `}
            >
              tataaat
            </a>{' '}
            ·{' '}
            <a
              href="https://soundcloud.com/tataaat/sets/original"
              title="Original - 歌らしい歌がある曲。"
              target="_blank"
              css={css`
                color: #cccccc;
                text-decoration: none;
              `}
            >
              Original - 歌らしい歌がある曲。
            </a>
          </div>
        </div>
        <div>
          <iframe
            css={css`
              border-style: none;
            `}
            width="100%"
            height="360"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2011681413&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div
            css={css`
              font-size: 10px;
              color: #cccccc;
              line-break: anywhere;
              word-break: normal;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family:
                Interstate,
                Lucida Grande,
                Lucida Sans Unicode,
                Lucida Sans,
                Garuda,
                Verdana,
                Tahoma,
                sans-serif;
              font-weight: 100;
            `}
          >
            <a
              href="https://soundcloud.com/tataaat"
              title="tataaat"
              target="_blank"
              css={css`
                color: #cccccc;
                text-decoration: none;
              `}
            >
              tataaat
            </a>{' '}
            ·{' '}
            <a
              href="https://soundcloud.com/tataaat/sets/original-1"
              title="Original - 気に入ってるやつ。歌らしい歌が無い曲。"
              target="_blank"
              css={css`
                color: #cccccc;
                text-decoration: none;
              `}
            >
              Original - 気に入ってるやつ。歌らしい歌が無い曲。
            </a>
          </div>
        </div>
      </div>
      <div css={styles.containerSubWrapper}>
        <div css={styles.containerSub}>
          <div>
            <iframe
              data-lnk-widget
              src="https://lnkfi.re/RmkxQmU1/widget"
              width="100%"
              height="352"
              frameBorder="0"
            ></iframe>
          </div>
          <div>
            <iframe
              css={css`
                border-style: none;
              `}
              data-lnk-widget
              src="https://lnkfi.re/BgMlYPHx/widget"
              width="100%"
              height="352"
            ></iframe>
          </div>
          <div>
            <iframe
              css={css`
                border-style: none;
              `}
              data-lnk-widget
              src="https://lnkfi.re/ILnqIESC/widget"
              width="100%"
              height="352"
            ></iframe>
          </div>
          <div>
            <iframe
              css={css`
                border-style: none;
              `}
              src="https://open.spotify.com/embed/track/1Ij9rrnz2uzhKvgrYQRJqa?utm_source=generator"
              width="100%"
              height="352"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  )
}
