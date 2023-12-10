
import LoginViewVue from '@/views/LoginView.vue';

import LoginViewVue from '@/views/LoginView.vue';
<template class="flex-grow">
  <div class="mx-auto mt-20 w-2/5 md:w-1/3 lg:w-2/5 xl:w-1/3 mb-20">
    <div class="mx-auto p-10 rounded-lg justify-center grid grid-cols-1 gap-y-4 w-full border space-y-8">
      <p class="text-2xl text-center">Hola 👋️</p>
      <div>
        <h3>Correo electrónico:</h3>
        <input v-model="userData.email" class="border rounded-lg px-4 py-4 w-full" type="email" name="email"
          placeholder="example@email.org">
      </div>
      <div>
        <h3>Contraseña:</h3>
        <input v-model="userData.password" class="border rounded-lg px-4 py-4 w-full" type="password" name="password"
          placeholder="********">
      </div>

      <p class="text-red-500 text-center" v-if="error">{{ 'El usuario que acaba de ingresar no existe' }}</p>

      <div class="mx-auto"> <button @click="login"
          class="text-left px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
          Iniciar Sesión
        </button>
      </div>

      <!-- <router-link to="/signup" class="mx-auto">
        <button class="px-10 place-self-center text-pink-500 hover:text-pink-700">
          ¿No tienes una cuenta?
        </button>
      </router-link> -->

      <RouterLink :to="{ name: 'register' }">
        <button class="w-full px-4 text-primary hover:text-primary80">
          ¿No tienes una cuenta?
        </button>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios';

const store = useStore()
const error = ref(null)
const userData = ref({
  email: '',
  password: '',
})

const router = useRouter()

const login = async () => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/login', userData.value)
    console.log(data)
    error.value = null
    store.dispatch('setUser', data)
    router.push({ path: '/' })
  } catch (e) {
    error.value = e
  }
}
</script>
