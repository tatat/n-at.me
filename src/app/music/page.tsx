import { Metadata, ResolvingMetadata } from 'next'
import { MusicContent } from './content'

export const generateMetadata = async (_: unknown, parent: ResolvingMetadata): Promise<Metadata> => {
  const metadata = await parent
  const title = 'Music'

  return {
    title: `${title} | ${metadata.title?.absolute ?? ''}`,
    description: title,
  }
}

export default function Music() {
  return <MusicContent />
}
