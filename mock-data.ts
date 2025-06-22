import Income from '#shared/models/income'
import Expense from '#shared/models/expense'

export const MOCK_INCOMES: Income[] = [
  new Income({
    id: 1,
    name: 'Salario',
    description: 'Salario mensual',
    amount: 1875000,
    type: 'fixed',
  }),
  new Income({
    id: 2,
    name: 'Freelance',
    description: 'Proyecto web',
    amount: 300000,
    type: 'extra',
  }),
]

export const MOCK_EXPENSES: Expense[] = [
  new Expense({
    id: 1,
    name: 'Alquiler',
    description: 'Depto 2 amb',
    amount: 750000,
    frequency: 'monthly',
  }),
  new Expense({
    id: 2,
    name: 'Wowsito',
    description: 'Sub anual del wow',
    amount: 100000,
    frequency: 'yearly',
  }),
]
