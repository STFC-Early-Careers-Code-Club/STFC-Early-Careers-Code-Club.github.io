export function useTalkRequests() {
  const { issues, error } = useGithubIssues()

  const talkRequests = computed(() => {
    return issues.value?.filter(issue => issue.labels.includes('Talk Request'))
  })

  return {
    talkRequests,
    error
  }
}