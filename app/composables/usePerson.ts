import type { Person } from '#imports'

export function usePerson(name: string) {
  const { data: person } = useAsyncData('person-' + name, async () => {
    return queryCollection('people')
      .where('name', '=', name)
      .first()
      .then(item => item ? item as Person : null)
  })

  return person
}
