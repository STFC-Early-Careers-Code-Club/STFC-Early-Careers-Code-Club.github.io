export async function useTalks() {
  const { data: rawTalks } = await useAsyncData('talks-list', () => {
    return queryCollection('talks').all()
  })

  const talks = computed(() => {
    return rawTalks.value?.map(talk => ({
      ...talk,
      date: new Date(talk.date)
    })).toSorted((a, b) => b.date.getTime() - a.date.getTime())
  })

  const now = useNow()

  const pastTalks = computed(() => {
    return talks.value?.filter(talk => talk.date <= now.value)
  })

  const upcomingTalks = computed(() => {
    return talks.value?.filter(talk => talk.date > now.value)
  })

  return {
    talks,
    pastTalks,
    upcomingTalks
  }
}