export default interface QueryParams {
  include?: string[]
  order?: [string, string] | null
  page?: number | null
  pageSize?: number | null
  where?: any | null
}
