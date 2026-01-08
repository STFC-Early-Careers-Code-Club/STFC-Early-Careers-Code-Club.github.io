interface GithubIssueApiResponse {
  html_url: string
  title: string
  user: {
    login: string
  }
  labels: {
    name: string
  }[],
  [key: string]: any
}

export interface GithubIssue {
  url: string
  title: string
  labels: string[]
  user: string
}

export function useGithubIssues() {
  const { data, error } = useFetch<GithubIssueApiResponse[]>('https://api.github.com/repos/STFC-Early-Careers-Code-Club/STFC-Early-Careers-Code-Club.github.io/issues')

  console.info(data.value)

  const issues = computed<GithubIssue[] | undefined>(() => data.value?.map(issue => ({
    url: issue.html_url,
    title: issue.title,
    labels: issue.labels.map(label => label.name),
    user: issue.user.login
  })))
  
  return {
    issues,
    error
  }
}