import { defineStore } from 'pinia'
import Income from '#shared/models/income'
import type Metadata from '#shared/models/metadata'
import { MOCK_INCOMES } from '../../mock-data'
import BaseResponseGetAll from '#shared/models/base-response-get-all'
import type QueryParams from '#shared/models/query-params'

export const useIncomesStore = defineStore('incomes', () => {
  // Composables
  const toast = useToast()
  const { t } = useI18n()
  const localePath = useLocalePath()

  // State
  const incomes = ref<Income[]>([])
  const income = ref<Income | undefined>(undefined)
  const loading = ref<boolean>(false)
  const metadata = ref<Metadata | undefined>(undefined)

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
        toast.add({
          title: t('store.incomes.create.success'),
          color: 'success',
        })
        navigateTo(localePath('panel-incomes'))
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
        toast.add({
          title: t('store.incomes.delete.success'),
          color: 'success',
        })
        fetchAllIncomes()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchAllIncomes({ params }: { params?: QueryParams } = {}) {
    setLoading(true)
    setIncomes([])
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        if (params) {
          console.log(generateQueryParams(params))
        }
        const incomes = new BaseResponseGetAll<Income>(MOCK_INCOMES, Income)
        setIncomes(incomes.rows)
        setMetadata(incomes.metadata)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  async function fetchIncomeById(id: number) {
    setLoading(true)
    setIncome(undefined)
    try {
      const response = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 500)
      )
      if (response) {
        const incomeToFind = MOCK_INCOMES.data.find((i) => i.id === id)
        if (incomeToFind) {
          const income = new Income(incomeToFind)
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
        const incomeToUpdate = MOCK_INCOMES.data.find((i) => i.id === id)
        if (incomeToUpdate) {
          const income = new Income({
            ...incomeToUpdate,
            ...payload,
            updatedAt: new Date(),
          })
          patchIncome(income)
          toast.add({
            title: t('store.incomes.update.success'),
            color: 'success',
          })
          navigateTo(localePath('panel-incomes'))
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
    MOCK_INCOMES.data.push({ ...payload, id: Number(payload.id) })
  }
  function patchIncome(payload: Income) {
    MOCK_INCOMES.data = MOCK_INCOMES.data.map((i) =>
      i.id === payload.id ? { ...payload, id: Number(payload.id) } : i
    )
  }
  function removeIncome(id: number) {
    MOCK_INCOMES.data = MOCK_INCOMES.data.filter((i) => i.id !== id)
  }
  function setIncome(payload: Income | undefined) {
    income.value = payload
  }
  function setIncomes(payload: Income[]) {
    incomes.value = payload
  }
  function setLoading(payload: boolean) {
    loading.value = payload
  }
  function setMetadata(payload: Metadata | undefined) {
    metadata.value = payload
  }

  return {
    incomes,
    income,
    loading,
    metadata,
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
