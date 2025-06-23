import { defineStore } from 'pinia'
import Expense from '#shared/models/expense'
import { MOCK_EXPENSES } from '../../mock-data'

export const useExpensesStore = defineStore('expenses', () => {
  // State
  const expenses = ref<Expense[]>([])
  const expense = ref<Expense | null>(null)
  const loading = ref<boolean>(false)

  // Actions
  async function createExpense(payload: Expense) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const expenseToCreate = new Expense({
          ...payload,
          id: expenses.value.length + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        addExpense(expenseToCreate)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function deleteExpense(id: number) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        removeExpense(id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchAllExpenses() {
    setLoading(true)
    setExpenses([])
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        setExpenses(MOCK_EXPENSES)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchExpenseById(id: number) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const expense = MOCK_EXPENSES.find((e) => e.id === id)
        if (expense) {
          setExpense(expense)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function updateExpense(id: number, payload: Expense) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const expenseToUpdate = expenses.value.find((e) => e.id === id)
        if (expenseToUpdate) {
          const expense = new Expense({
            ...expenseToUpdate,
            ...payload,
            updatedAt: new Date(),
          })
          patchExpense(expense)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Mutations
  function addExpense(payload: Expense) {
    expenses.value.push(payload)
  }
  function patchExpense(payload: Expense) {
    expenses.value = expenses.value.map((e) =>
      e.id === payload.id ? payload : e
    )
  }
  function removeExpense(id: number) {
    expenses.value = expenses.value.filter((e) => e.id !== id)
  }
  function setExpense(payload: Expense) {
    expense.value = payload
  }
  function setExpenses(payload: Expense[]) {
    expenses.value = payload
  }
  function setLoading(payload: boolean) {
    loading.value = payload
  }

  return {
    expenses,
    expense,
    loading,
    createExpense,
    deleteExpense,
    fetchAllExpenses,
    fetchExpenseById,
    updateExpense,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExpensesStore, import.meta.hot))
}
