import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref<boolean>(false)

  // Mutations
  function setLoading(payload: boolean) {
    isLoading.value = payload
  }

  return { isLoading, setLoading }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
