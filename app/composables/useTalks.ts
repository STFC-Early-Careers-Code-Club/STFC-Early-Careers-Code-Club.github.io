import { sanitiseTalksCollectionItem } from "~/lib/sanitiseTalksCollectionItem"

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

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
    return talks.value?.filter(talk => talk.date < now.value && !isSameDay(talk.date, now.value))
  })

  const upcomingTalks = computed(() => {
    return talks.value?.filter(talk => talk.date >= now.value)
  })

  const todaysTalk = computed(() => {
    return talks.value?.find(talk => isSameDay(talk.date, now.value))
  })

  return {
    talks,
    pastTalks,
    upcomingTalks,
    todaysTalk
  }
}