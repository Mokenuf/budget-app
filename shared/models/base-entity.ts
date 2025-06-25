interface Parser<T> {
  parse(entity: T): T
  parseMultiple(entities: T[]): T[]
  populate(entity: any): void
}

export default abstract class BaseEntity<T> implements Parser<T> {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  constructor(entity?: any) {
    this.id = entity?.id
    this.createdAt = entity?.createdAt
    this.updatedAt = entity?.updatedAt
    this.deletedAt = entity?.deletedAt
    if (entity) this.populate(entity)
  }

  public abstract parse(entity: T): T

  public parseMultiple(entities: T[]): T[] {
    return entities?.map((e) => this.parse(e)) || []
  }

  public abstract populate(entity: any): void
}
