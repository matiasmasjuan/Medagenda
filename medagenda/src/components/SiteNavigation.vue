<template>
  <header class="sticky top-0 shadow-lg">
    <nav class="flex sm:flex-row flex-col items-center justify-between gap-4 py-4 px-8">

      <div class="flex space-x-6 items-center ml-40">
        <RouterLink :to="{ name: 'home' }">
          <i class="fa-regular fa-calendar px-3" style="color: #4d91ff;"></i>
          <span class="text-lg font-bold text-primary">Medagenda</span>
        </RouterLink>
      </div>

      <div class="flex space-x-6 mr-40">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <button class="px-4 py-2 mx-auto bg-transparent hover:text-primary rounded-full">
              Iniciar Sesión
            </button>
          </RouterLink>

          <RouterLink :to="{ name: 'home' }">
            <button class="px-4 py-2 mx-auto  bg-primary text-white hover:text-lgray rounded-md">
              Registrarse
            </button>
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
