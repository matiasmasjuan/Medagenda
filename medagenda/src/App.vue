<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-primary-background">
    <SiteNavigation />
    <RouterView />
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<style lang="scss" scoped></style>