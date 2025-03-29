export const categories = ['original', 'fanart'] as const

export type Category = (typeof categories)[number]

export type IllustrationBase = {
  ids: string[]
  category: Category
  title: string
  links?: string[]
}

export type Illustration = IllustrationBase & {
  primaryKey: string
  imagePath: string
  thumbnailImagePath: string
}

const config: IllustrationBase[] = [
  { ids: ['ynl', 'cxb7rci6myo'], category: 'original', title: '横目がちな少女' },
  { ids: ['xdp', 'cm5gk0fuftc'], category: 'original', title: '自殺観念' },
  { ids: ['k0j', 'ek8rbse1g94'], category: 'original', title: 'ふわふわ' },
  { ids: ['ee5', 'nrp6mp8ex68'], category: 'original', title: 'イタズラ' },
  { ids: ['1r1', 'a69v9wt8kc0'], category: 'original', title: '世界' },
  { ids: ['a0k', '7rhrbxpr7ug'], category: 'original', title: '繋がる' },
  { ids: ['yib', '5iecxhthbj0g'], category: 'original', title: '点滴' },
  { ids: ['3ch', '2bg9j0ie1zfo'], category: 'original', title: '部屋' },
  { ids: ['shi', '4swaxyt41da8'], category: 'original', title: '落とし穴' },
  { ids: ['98d', '1rojhfj5klj4'], category: 'original', title: 'うつうつ' },
  { ids: ['xy9', '5e86x19vcjgg'], category: 'original', title: '音' },
  { ids: ['c57', '39345yrozag4'], category: 'original', title: '冬' },
  { ids: ['yvg', '26icziisqf1c'], category: 'original', title: '遠心力その他もろもろ' },
  { ids: ['0of', '2cxxcdhn00r'], category: 'original', title: '2011年賀' },
  { ids: ['hih', '5ky0cyf281og'], category: 'original', title: '緊縛' },
  { ids: ['mit', '3gcx64tmax0k'], category: 'original', title: '緊縛後日談' },
  { ids: ['zxb', 'duvCka60SDac'], category: 'original', title: 'バランス' },
  { ids: ['lcp', 'iUrivmU0fG2M'], category: 'original', title: 'ガーディアン' },
  { ids: ['833', 'NqN8fdn70czf'], category: 'original', title: '穴' },
  { ids: ['uby', '4gsouFZJtttL'], category: 'original', title: 'マフラー' },
  { ids: ['c62', 'oTpnS150Ob5X'], category: 'original', title: '2' },
  { ids: ['liy', '3IMSFLwmrAww'], category: 'original', title: '沈む' },
  { ids: ['952', 'Mq5Bd2uMkWt5'], category: 'original', title: '無かった' },
  { ids: ['3on', 'lNB7oTcCyD13'], category: 'original', title: 'untitled' },
  { ids: ['28d', 'trx2K'], category: 'original', title: 'はいもしもし' },
  { ids: ['nlw', 'MmdUO'], category: 'original', title: 'うさぎさん' },
  { ids: ['yr5', 'CYZG72phbCsZ'], category: 'original', title: '飛べると思った' },
  { ids: ['mer', '6lEoiGNJLrYS'], category: 'original', title: '_' },
  { ids: ['duc', 'qiiFa'], category: 'original', title: 'あたまかゆい' },
  { ids: ['tvp', 'TFJw4'], category: 'original', title: 'ping-pong' },
  { ids: ['fb0', '2Jfyl'], category: 'original', title: 'おうち（兵器）' },
  { ids: ['x2p', 'XuLj0'], category: 'original', title: 'しとしと' },
  { ids: ['jew', 'h6gvj'], category: 'original', title: '雨雲' },
  { ids: ['qrt', 'okz', 'iWw08'], category: 'original', title: 'バス停' },
  { ids: ['0tv', 'BVLF1'], category: 'original', title: '髪飾り' },
  { ids: ['v1e', 'CXsFf'], category: 'original', title: '箱' },
  { ids: ['hab', '22PhC'], category: 'original', title: '上皿天秤' },
  { ids: ['xo0', 'fdXKr'], category: 'original', title: '公園' },
  { ids: ['vk0'], category: 'original', title: 'F' },
  { ids: ['mu4'], category: 'original', title: 'F' },
  { ids: ['ds8'], category: 'original', title: '行かないの？' },
  { ids: ['e0I'], category: 'original', title: '..' },
  { ids: ['2y3'], category: 'original', title: 'トンネル' },
  { ids: ['i9k'], category: 'original', title: '通学' },
  { ids: ['2eF'], category: 'original', title: 'rip' },
  {
    ids: ['Tg0'],
    category: 'original',
    title: 'Everything Dreamed It - Last Parade Records',
    links: ['http://lastparaderecords.bandcamp.com/album/everything-dreamed-it'],
  },
  {
    ids: ['1Im'],
    category: 'original',
    title: 'Nostalgic Portrait - Foilverb',
    links: ['https://bigbrother404.bandcamp.com/album/nostalgic-portrait', 'https://lastparades.booth.pm/items/625396'],
  },
  {
    ids: ['x0O'],
    category: 'original',
    title: 'Ordinary - ポリスピカデリー',
    links: ['http://www.nicovideo.jp/watch/sm32035455', 'https://www.youtube.com/watch?v=0KghO_YPUV8'],
  },
  { ids: ['7vQ'], category: 'original', title: 'fluffy' },
  { ids: ['U4w'], category: 'original', title: '2018' },
  { ids: ['4Eh'], category: 'original', title: 'bury' },
  { ids: ['Q6n'], category: 'original', title: 'cell' },
  {
    ids: ['Sj8'],
    category: 'original',
    title: 'Solitary Battlefields EP - Foilverb',
    links: ['https://booth.pm/ja/items/887573'],
  },
  { ids: ['bT6'], category: 'original', title: 'follow' },
  {
    ids: ['7vN'],
    category: 'original',
    title: 'the end of whitenote - Foilverb & Sourin',
    links: ['https://bigbrother404.bandcamp.com/album/the-end-of-whitenote'],
  },
  { ids: ['b8A'], category: 'original', title: 'drip' },
  { ids: ['H5p'], category: 'original', title: '2020' },
  { ids: ['9Zx'], category: 'original', title: 'balloon' },
  {
    ids: ['3Ey'],
    category: 'original',
    title: '海と水槽 - 錦玉もなか',
    links: [
      'https://open.spotify.com/track/136q63ldu3DkIrRN3yvmwX?si=17aad4e542a94a8b',
      'https://music.youtube.com/playlist?list=OLAK5uy_kd56YCLnCjxpY-BMV6nVnTa9aIGBTxAxk&feature=share',
      'https://music.apple.com/jp/album/%E6%B5%B7%E3%81%A8%E6%B0%B4%E6%A7%BD-single/1574881503',
    ],
  },
  { ids: ['n4A'], category: 'original', title: 'patch' },
  { ids: ['1O0'], category: 'original', title: 'ん' },
  { ids: ['c9L'], category: 'original', title: 'security' },
  { ids: ['XOk'], category: 'original', title: 'Atelier', links: ['https://www.youtube.com/watch?v=xEQK0oNfqFI'] },
  { ids: ['dLG'], category: 'original', title: 'It seems so', links: ['https://www.youtube.com/watch?v=LAbft_tGemY'] },
  { ids: ['Y7s'], category: 'original', title: 'Acceptable', links: ['https://www.youtube.com/watch?v=aHxsROHS6nk'] },
]

export const illustrations = config.reverse().map(
  (item): Illustration => ({
    ...item,
    primaryKey: item.ids[0],
    imagePath: `/images/illustrations/${item.ids[0]}.jpg`,
    thumbnailImagePath: `/images/illustrations/${item.ids[0]}.thumb.jpg`,
  }),
)
