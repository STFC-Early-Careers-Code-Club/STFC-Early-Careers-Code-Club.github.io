import type { LocationQueryValue } from 'vue-router'

export function useQueryParam<T extends LocationQueryValue>(
  key: string,
  parse: (value: string | undefined) => T
) {
  const route = useRoute()
  const router = useRouter()

  return computed<T>({
    get() {
      return parse(route.query[key]?.toString())
    },
    set(value) {
      router.push({
        query: {
          ...route.query,
          [key]: value
        }
      })
    }
  })
}
