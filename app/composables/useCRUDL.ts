export function useCRUDL(entity?: string) {
  const route = useRoute()
  const { t } = useI18n()
  const localePath = useLocalePath()

  const entityKey = entity || route.name?.toString().split('-')[0]

  const addLabel = computed(() => t(`pages.${entityKey}.index.add`))
  const addRoute = computed(() => `${entityKey}-add`)
  const title = computed(() => t(`pages.${entityKey}.index.title`))

  function onEdit(id: string | number) {
    navigateTo(localePath({ name: `${entityKey}-id-edit`, params: { id } }))
  }

  function onDelete(id: string | number) {
    console.log('delete', id)
  }

  return {
    title,
    addLabel,
    addRoute,
    onEdit,
    onDelete,
  }
}
