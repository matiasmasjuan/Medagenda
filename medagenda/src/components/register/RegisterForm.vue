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
      <div>
        <h3>Seleccionar Rol:</h3>
        <div class="flex items-center mx-auto w-1/2 mt-2">
          <div class="flex items-center mr-8">
            <input v-model="userData.role" type="radio" value="Patient" id="Patient">
            <label for="Patient" class="ml-2">Paciente</label>
          </div>

          <div class="flex items-center ml-8">
            <input v-model="userData.role" type="radio" value="Doctor" id="Doctor">
            <label for="Doctor" class="ml-2">Doctor</label>
          </div>
        </div>
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
import { useStore } from 'vuex'
import axios from 'axios';

const store = useStore()
const error = ref(null)
const userData = ref({
  name: '',
  email: '',
  password: '',
  role: 'Patient',
  professionId: 1
})

const router = useRouter()

const register = async () => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, userData.value)
    error.value = null
    store.dispatch('setUser', data)
    router.push({ name: 'home' })
  } catch (e) {
    error.value = e
  }
}
</script>
