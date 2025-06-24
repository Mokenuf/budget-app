export default defineNuxtPlugin((nuxtApp) => {
  const t = nuxtApp.vueApp.config.globalProperties.$t

  const dialogState = reactive({
    show: false,
    title: '',
    message: '',
    resolve: (_val: boolean) => {},
  })

  function confirm(options: { title: string; message: string }) {
    dialogState.title = options.title
      ? t(options.title)
      : t('plugins.dialog.title')
    dialogState.message = t(options.message)
    dialogState.show = true

    return new Promise<boolean>((resolve) => {
      dialogState.resolve = resolve
    })
  }

  nuxtApp.provide('dialog', {
    confirm,
    state: markRaw(dialogState),
  })
})

declare module '#app' {
  interface NuxtApp {
    $dialog: {
      confirm: (options: { title: string; message: string }) => Promise<boolean>
      state: {
        show: boolean
        title: string
        message: string
        resolve: (value: boolean) => void
      }
    }
  }
}
