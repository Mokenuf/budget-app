export function generateQueryParams(queryParams) {
  let params = { ...queryParams }
  if (params?.order) {
    params.order = JSON.stringify(params.order)
  }
  if (params?.include) {
    params.include = JSON.stringify(params.include)
  }
  if (params?.where) {
    const { where, ...rest } = params
    params = {
      ...rest,
      ...where,
    }
  }
  return params
}
