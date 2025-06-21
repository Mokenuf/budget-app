import BaseEntity from './base-entity'

type ExpenseFrequency = 'monthly' | 'yearly'

export default class Expense extends BaseEntity<Expense> {
  amount: number
  description: string
  monthlyAmount?: number
  name: string
  frequency: ExpenseFrequency

  parse(e: any): Expense {
    return new Expense(e)
  }

  populate(expense: Expense) {
    this.amount = expense.amount
    this.description = expense.description
    this.name = expense.name
    this.frequency = expense.frequency
    this.monthlyAmount =
      this.frequency === 'yearly' ? this.amount / 12 : this.amount
  }
}
