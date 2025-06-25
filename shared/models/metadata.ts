export default class Metadata {
  total: number
  page: number
  pageSize: number

  constructor(metadata) {
    this.total = metadata.total
    this.page = metadata.page
    this.pageSize = metadata.pageSize
  }
}
