<template>
  <div class="h-screen">

    <div class="mx-auto max-w-7xl px-4 pb-20 pt-40 flex mb-4 lg:pt-12 2xl:pt-36">
      <div class="w-1/2  ml-32">
        <h1 class="text-5xl mt-16">
          En <span class="font-bold text-primary">Medagenda</span> cuidamos tu salud
        </h1>
        <p class="text-2xl text-gray-500 py-8">Date prisa y agenda tu hora lo antes posible</p>

        <div class="flex justify-center">
          <RouterLink :to="{ name: 'home' }">
            <button class="text-left px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
              Registrarse
            </button>
          </RouterLink>
        </div>

        <div class="flex justify-center">
          <p class="text-gray-600 pt-4">
            ¿Ya tienes una cuenta?
            <RouterLink :to="{ name: 'home' }">
              <span class="text-primary hover:text-primary90">Iniciar Sesión</span>
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
</script>