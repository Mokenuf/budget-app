export default defineNuxtRouteMiddleware((to, from) => {
  console.log('private', to, from)
})
