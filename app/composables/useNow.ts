export function useNow() {
  const now = ref(new Date())

  onMounted(() => {
    setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  return computed(() => now.value)
}