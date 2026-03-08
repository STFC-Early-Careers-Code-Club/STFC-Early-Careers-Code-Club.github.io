import type { PeopleCollectionItem } from '@nuxt/content'
import type { Talk } from '~/lib/sanitiseTalksCollectionItem'
import { Role, isRole } from '~/lib/roles'

export type Person = Omit<PeopleCollectionItem, 'roles'> & {
  roles: Role[]
  talks: Talk[]
}

export function usePeople() {
  const { talks } = useTalks()

  const { data: rawPeople } = useAsyncData(
    'people-list',
    () => queryCollection('people').all()
  )

  const people = computed<Person[]>(() => {
    const sortedPeople = rawPeople.value?.map((person) => {
      const talksForPerson = talks.value?.filter(talk => talk.speaker === person.name) || []

      return {
        ...person,
        roles: (person.roles || []).filter(isRole).concat(talksForPerson.length > 0 ? [Role.Speaker] : []),
        talks: talksForPerson
      }
    }).sort((a, b) => b.talks.length - a.talks.length) || []

    const mostTalks = sortedPeople[0]?.talks.length || 0

    return sortedPeople.map(person => ({
      ...person,
      roles: person.talks.length === mostTalks ? person.roles.concat([Role.TopSpeaker]) : person.roles
    }))
  })

  return {
    people
  }
}
