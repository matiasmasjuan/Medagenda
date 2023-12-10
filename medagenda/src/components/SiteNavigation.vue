<template>
  <header class="sticky top-0 shadow-lg bg-white">
    <nav class="flex sm:flex-row flex-col items-center justify-between gap-4 py-4 px-8">

      <div class="flex space-x-6 items-center ml-4 sm:ml-40">
        <RouterLink :to="{ name: 'home' }">
          <i class="fa-regular fa-calendar px-3" style="color: #4d91ff;"></i>
          <span class="text-lg font-bold text-primary">Medagenda</span>
        </RouterLink>
      </div>

      <div class="flex space-x-6 justify-end mr-4 sm:mr-40">

        <button class="sm:hidden" @click="toggleMobileMenu">
          <i class="fas fa-bars text-2xl"></i>
        </button>


        <div v-if="user" class="hidden sm:flex space-x-6">
          <RouterLink :to="{ name: 'login' }">
            <button class="px-4 py-2 hover:text-primary rounded-full">
              Mi Agenda
            </button>
          </RouterLink>

          <RouterLink :to="{ name: 'register' }">
            <button class="px-4 py-2 bg-primary text-white hover:text-lgray rounded-md">
              Cerrar Sesión
            </button>
          </RouterLink>
        </div>

        <div v-else class="hidden sm:flex space-x-6">
          <RouterLink :to="{ name: 'login' }">
            <button class="px-4 py-2 hover:text-primary rounded-full">
              Iniciar Sesión
            </button>
          </RouterLink>

          <RouterLink :to="{ name: 'register' }">
            <button class="px-4 py-2 bg-primary text-white hover:text-lgray rounded-md">
              Registrarse
            </button>
          </RouterLink>
        </div>

        <!-- <div v-if="isMobileMenuOpen" class="sm:hidden absolute top-16 right-0 bg-white p-4 space-y-2">
          <RouterLink :to="{ name: 'login' }">
            <button class="w-full text-left px-4 py-2 hover:text-primary rounded-full">
              Iniciar Sesión
            </button>
          </RouterLink>

          <RouterLink :to="{ name: 'register' }">
            <button class="w-full text-left px-4 py-2 bg-primary text-white hover:text-lgray rounded-md">
              Registrarse
            </button>
          </RouterLink>
        </div> -->

      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const store = useStore()
const user = computed(() => store.getters.getUser)
</script>

<style scoped>
/* Add your custom styles here */
</style>
