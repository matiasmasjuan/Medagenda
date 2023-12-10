<template class="flex-grow">
  <div class="mx-auto mt-20 w-2/5 md:w-1/3 lg:w-2/5 xl:w-1/3 mb-20">
    <div class="mx-auto p-10 rounded-lg justify-center grid grid-cols-1 gap-y-4 w-full border space-y-8">
      <p class="text-2xl text-center">Bienvenido 👋️</p>
      <div>
        <h3>Nombre:</h3>
        <input v-model="userData.name" class="border rounded-lg px-4 py-4 w-full" type="name" name="name"
          placeholder="Nombre">
      </div>
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

      <div class="mx-auto"> <button @click="register"
          class="text-left px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
          Registrarse
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import UserApi from '../../api/user'

const error = ref(null)
const userData = ref({
  name: null,
  email: null,
  password: null,
  role: 'Patient',
  professionId: 1
})

const router = useRouter()

const register = async () => {
  try {
    console.log(userData)
    const { data } = await UserApi.post(userData.value)
    console.log(data)
    error.value = null
    // $store.dispatch('setUser', data)
    router.push({ path: '/' })
  } catch (e) {
    error.value = e
  }
}
</script>
