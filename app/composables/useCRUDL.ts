export function useCRUDL(entity: string) {
  const { t } = useI18n()
  const localePath = useLocalePath()

  const addLabel = computed(() => t(`pages.${entity}.index.add`))
  const addRoute = computed(() => `${entity}-add`)
  const title = computed(() => t(`pages.${entity}.index.title`))

  function onEdit(id: string | number) {
    navigateTo(localePath({ name: `${entity}-id-edit`, params: { id } }))
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
