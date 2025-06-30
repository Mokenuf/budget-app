<template>
  <div>
    <div class="mb-8">
      <img src="/fbt-logo.png" :alt="$t('app.splash.logo-alt')" width="384" />
    </div>
    <div class="flex flex-col gap-4 w-full max-w-sm">
      <UButton
        :to="$localePath('auth-sign-in')"
        class="cursor-pointer"
        color="primary"
        size="lg"
        block
        :label="$t('app.splash.sign-in')"
      />

      <UButton
        :to="$localePath('auth-sign-up')"
        class="cursor-pointer"
        variant="outline"
        size="lg"
        block
        :label="$t('app.splash.sign-up')"
      />
    </div>
  </div>
</template>
