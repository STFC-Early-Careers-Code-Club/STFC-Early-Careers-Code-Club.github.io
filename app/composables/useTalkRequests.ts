export async function useTalkRequests() {
  const { issues, error } = await useGithubIssues()

  const talkRequests = computed(() => {
    return issues.value?.filter(issue => issue.labels.includes('Talk Request'))
  })

  return {
    talkRequests,
    error
  }
}