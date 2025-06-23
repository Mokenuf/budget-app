/**
 * Composable helper to handle CRUDL operations for a given entity.
 *
 * @param entity - (Optional) You can pass the entity as a parameter to the
 *                 composable if the route path is not the same as the entity name.
 *                 If not provided, the entity key will be inferred from the route path.
 *
 * @returns An object with localized title, add label, add route, and navigation handlers.
 *
 * @example
 * const { title, addLabel, addRoute, onEdit, onDelete } = useCRUDL('expenses')
 */
export function useCRUDL(entity?: string) {
  const route = useRoute()
  const { t } = useI18n()
  const localePath = useLocalePath()
  const { title: configTitle } = useAppConfig()

  const entityKey = entity || route.path.split('/')[1] || ''

  const addLabel = computed<string>(() => t(`pages.${entityKey}.index.add`))
  const addRoute = computed<string>(() => localePath(`${entityKey}-add`))
  const headTitle = computed<string>(
    () => `${t(`pages.${entityKey}.index.title`)} | ${configTitle}`
  )
  const title = computed<string>(() => t(`pages.${entityKey}.index.title`))

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
    headTitle,
    onEdit,
    onDelete,
  }
}
