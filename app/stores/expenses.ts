import { defineStore } from 'pinia'
import BaseResponseGetAll from '#shared/models/base-response-get-all'
import Expense from '#shared/models/expense'
import type Metadata from '#shared/models/metadata'
import { MOCK_EXPENSES } from '../../mock-data'

export const useExpensesStore = defineStore('expenses', () => {
  // Composables
  const toast = useToast()
  const { t } = useI18n()
  const localePath = useLocalePath()

  // State
  const expenses = ref<Expense[]>([])
  const expense = ref<Expense | undefined>(undefined)
  const loading = ref<boolean>(false)
  const metadata = ref<Metadata | undefined>(undefined)

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
        toast.add({
          title: t('store.expenses.create.success'),
          color: 'success',
        })
        navigateTo(localePath('expenses'))
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
        toast.add({
          title: t('store.expenses.delete.success'),
          color: 'success',
        })
        fetchAllExpenses()
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
    setMetadata(undefined)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const expenses = new BaseResponseGetAll<Expense>(MOCK_EXPENSES, Expense)
        setExpenses(expenses.rows)
        setMetadata(expenses.metadata)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchExpenseById(id: number) {
    setLoading(true)
    setExpense(undefined)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const expenseToFind = MOCK_EXPENSES.data.find((e) => e.id === id)
        if (expenseToFind) {
          const expense = new Expense(expenseToFind)
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
          toast.add({
            title: t('store.expenses.update.success'),
            color: 'success',
          })
          navigateTo(localePath('expenses'))
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
    MOCK_EXPENSES.data.push({ ...payload, id: Number(payload.id) })
  }
  function patchExpense(payload: Expense) {
    MOCK_EXPENSES.data = MOCK_EXPENSES.data.map((e) =>
      e.id === payload.id ? { ...payload, id: Number(payload.id) } : e
    )
  }
  function removeExpense(id: number) {
    MOCK_EXPENSES.data = MOCK_EXPENSES.data.filter((e) => e.id !== id)
  }
  function setExpense(payload: Expense | undefined) {
    expense.value = payload
  }
  function setExpenses(payload: Expense[]) {
    expenses.value = payload
  }
  function setLoading(payload: boolean) {
    loading.value = payload
  }
  function setMetadata(payload: Metadata | undefined) {
    metadata.value = payload
  }

  return {
    expenses,
    expense,
    loading,
    metadata,
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
