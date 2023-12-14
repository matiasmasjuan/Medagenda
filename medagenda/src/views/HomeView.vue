<template>
  <main>
    <component :is="view" />
  </main>
</template>

<script setup>
import DefaultHome from '../components/home/DefaultHome.vue'
import AuthHome from '../components/home/AuthHome.vue'

import { useStore } from 'vuex'

const store = useStore()
const user = store.getters.getUser

const view = user ? AuthHome : DefaultHome

</script>

<style lang="scss" scoped></style>