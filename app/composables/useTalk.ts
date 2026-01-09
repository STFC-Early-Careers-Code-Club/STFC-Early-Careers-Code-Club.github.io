import { sanitiseTalksCollectionItem } from "~/lib/sanitiseTalksCollectionItem"

export async function useTalk(path: string) {
  const { data: talk } = await useAsyncData('talk-' + path, async () => {
    return queryCollection('talks')
      .path(path)
      .first()
      .then(item => item ? sanitiseTalksCollectionItem(item) : null)
  })

  return talk
}