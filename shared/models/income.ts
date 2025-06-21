import BaseEntity from './base-entity'

type IncomeType = 'fixed' | 'extra'

export default class Income extends BaseEntity<Income> {
  amount: number
  description: string
  name: string
  type: IncomeType

  parse(e: any): Income {
    return new Income(e)
  }

  populate(income: any) {
    this.amount = income.amount
    this.description = income.description
    this.name = income.name
    this.type = income.type
  }
}
