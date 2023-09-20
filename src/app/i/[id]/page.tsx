import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { illustrations } from '@/config/illustrations'
import type { Params } from './types'
import { IllustrationContent } from './content'

export const generateMetadata = async (
  { params }: { params: Params },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const illustration = illustrations.find((illustration) => illustration.ids.includes(params.id))
  const metadata = await parent
  const title = illustration?.title ?? 'Untitled'

  return {
    title: `${title} | ${metadata.title?.absolute ?? ''}`,
    description: title,
  }
}

export const generateStaticParams = (): Params[] => {
  return illustrations.flatMap((illustration) => illustration.ids.map((id) => ({ id })))
}

export default function IllustrationPage({ params: { id } }: { params: Params }) {
  const illustration = illustrations.find((illustration) => illustration.ids.includes(id))

  if (illustration == null) {
    redirect('/404')
  }

  if (id !== illustration.primaryKey) {
    redirect(`/i/${illustration.primaryKey}`)
  }

  return <IllustrationContent illustration={illustration} />
}
