import { defineStore } from 'pinia'
import Income from '#shared/models/income'
import { MOCK_INCOMES } from '../../mock-data'

export const useIncomesStore = defineStore('incomes', () => {
  // State
  const incomes = ref<Income[]>([])
  const income = ref<Income | null>(null)
  const loading = ref<boolean>(false)

  // Actions
  async function createIncome(payload: Income) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const incomeToCreate = new Income({
          ...payload,
          id: incomes.value.length + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        addIncome(incomeToCreate)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function deleteIncome(id: number) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        removeIncome(id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchAllIncomes() {
    setLoading(true)
    setIncomes([])
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        setIncomes(MOCK_INCOMES)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchIncomeById(id: number) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const income = MOCK_INCOMES.find((e) => e.id === id)
        if (income) {
          setIncome(income)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function updateIncome(id: number, payload: Income) {
    setLoading(true)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const incomeToUpdate = incomes.value.find((e) => e.id === id)
        if (incomeToUpdate) {
          const income = new Income({
            ...incomeToUpdate,
            ...payload,
            updatedAt: new Date(),
          })
          patchIncome(income)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Mutations
  function addIncome(payload: Income) {
    incomes.value.push(payload)
  }
  function patchIncome(payload: Income) {
    incomes.value = incomes.value.map((e) =>
      e.id === payload.id ? payload : e
    )
  }
  function removeIncome(id: number) {
    incomes.value = incomes.value.filter((e) => e.id !== id)
  }
  function setIncome(payload: Income) {
    income.value = payload
  }
  function setIncomes(payload: Income[]) {
    incomes.value = payload
  }
  function setLoading(payload: boolean) {
    loading.value = payload
  }

  return {
    incomes,
    income,
    loading,
    createIncome,
    deleteIncome,
    fetchAllIncomes,
    fetchIncomeById,
    updateIncome,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIncomesStore, import.meta.hot))
}
