export async function useNavigation() {
  const { data: navigation } = await useAsyncData(
    'navigation',
    () => queryCollectionNavigation('talks')
      .where('date', 'IS NOT NULL')
      .order('date', 'ASC')
  )
  const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('talks'), {
    server: false
  })

  return {
    navigation,
    files
  }
}
