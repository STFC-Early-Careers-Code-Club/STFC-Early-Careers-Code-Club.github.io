import type { PeopleCollectionItem } from "@nuxt/content"
import type { Talk } from "~/lib/sanitiseTalksCollectionItem"

export type Person = PeopleCollectionItem & {
  talks: Talk[]
}

export function usePeople() {
  const { talks } = useTalks()

  const { data: rawPeople } = useAsyncData(
    'people-list',
    () => queryCollection('people').all()
  )

  const people = computed<Person[]>(() => rawPeople.value?.map(person => {
    const talksForPerson = talks.value?.filter(talk => talk.speaker === person.name) || []

    return {
      ...person,
      talks: talksForPerson
    }
  }) || [])

  return {
    people
  }
}