import type QueryParams from '#shared/models/query-params'

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

  const entityKey = entity || route.path.split('panel/')[1] || ''
  const params = reactive<QueryParams>({
    page: 1,
    pageSize: 10,
  })

  const addLabel = computed<string>(() =>
    t(`pages.panel.${entityKey}.index.add`)
  )
  const addRoute = computed<string>(() => localePath(`panel-${entityKey}-add`))
  const headTitle = computed<string>(
    () => `${t(`pages.panel.${entityKey}.index.title`)} | ${configTitle}`
  )
  const title = computed<string>(() =>
    t(`pages.panel.${entityKey}.index.title`)
  )

  function onEdit(id: string | number) {
    navigateTo(
      localePath({ name: `panel-${entityKey}-id-edit`, params: { id } })
    )
  }

  return {
    addLabel,
    addRoute,
    headTitle,
    onEdit,
    params,
    title,
  }
}
