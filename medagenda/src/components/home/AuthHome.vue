<template>
  <div class="h-screen">

    <div class="mx-auto max-w-7xl px-4 pb-20 pt-40 flex mb-4 lg:pt-12 2xl:pt-36">
      <div class="w-1/2  ml-32">
        <h1 class="text-5xl mt-16">
          Hola <span class="font-bold text-primary">{{ user.name }}</span> 👋
        </h1>
        <p class="text-2xl text-gray-500 py-8">¿Necesitas agendar una consulta?</p>

        <div class="flex justify-left ml-20">
          <RouterLink :to="{ name: 'scheduler' }">
            <button class="text-left px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
              Agendar Hora
            </button>
          </RouterLink>
        </div>

        <div class="flex justify-left">
          <p class="text-gray-600 pt-4">
            ¿Ya tienes una hora reservada?
            <RouterLink :to="{ name: 'my-schedule' }">
              <span class="text-primary hover:text-primary80">Revisa tu agenda</span>
            </RouterLink>
          </p>
        </div>

      </div>

      <div class="w-1/2">
        <img class="pl-8 pb-8" src="../../assets/images/landing-doctor.png" alt="Stonks Drawing" />
      </div>

    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const user = store.getters.getUser

</script>