import { sanitiseTalksCollectionItem, type Talk } from "~/lib/sanitiseTalksCollectionItem"

export function useTalks() {
  const { data: rawTalks } = useAsyncData(
    'talks-list',
    () => queryCollection('talks').all()
  )

  const talks = computed(() => {
    return rawTalks.value
      ?.map(sanitiseTalksCollectionItem)
      .toSorted((a, b) => b.date.getTime() - a.date.getTime())
  })

  const now = useNow()

  const pastTalks = computed(() => {
    return talks.value?.filter(talk => talk.date < now.value)
  })

  const upcomingTalks = computed(() => {
    return talks.value?.filter(talk => talk.date >= now.value)
  })

  return {
    talks,
    pastTalks,
    upcomingTalks
  }
}