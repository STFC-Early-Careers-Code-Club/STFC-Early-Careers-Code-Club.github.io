import type { TalksCollectionItem } from "@nuxt/content";

export function sanitiseTalksCollectionItem(item: TalksCollectionItem) {
  return {
    ...item,
    date: new Date(item.date)
  }
}

export type Talk = ReturnType<typeof sanitiseTalksCollectionItem>;