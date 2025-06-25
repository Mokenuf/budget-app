import Metadata from './metadata'
import type BaseEntity from './base-entity'

export default class BaseResponseGetAll<T extends BaseEntity<T>> {
  rows: T[] = []
  metadata?: Metadata

  constructor(response, Type: new () => T) {
    const modelType: T = new Type()
    this.rows = modelType.parseMultiple(response?.data || [])
    if (response?.metadata) {
      this.metadata = new Metadata(response.metadata)
    }
  }
}
