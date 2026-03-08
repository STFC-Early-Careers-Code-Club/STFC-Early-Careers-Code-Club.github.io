import type { TalksCollectionItem } from '@nuxt/content'

export function sanitiseTalksCollectionItem(item: TalksCollectionItem) {
  if (typeof item.date !== 'string') {
    throw new Error(`Expected date to be a string, got ${typeof item.date}`)
  }

  return {
    ...item,
    date: new Date(item.date)
  }
}

export type Talk = ReturnType<typeof sanitiseTalksCollectionItem>
