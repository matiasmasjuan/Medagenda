<template class="flex-grow">
  <div class="mx-auto mt-20 w-4/5 md:w-2/3 lg:w-2/5 xl:w-2/3 mb-20">
    <div class="mx-auto p-10 rounded-lg justify-center grid grid-cols-1 gap-y-4 w-full border space-y-8 mb-4">
      <p class="text-2xl text-center">Agendar Hora 🗓</p>
      <div class="flex mx-auto">
        <div class="mr-20 w-1/2">
          <h3>Ingrese la fecha de consulta:</h3>
          <VueDatePicker v-model="selectedDate" :min-date="new Date()" placeholder="Selecciona el día"
            :enable-time-picker="false" />
        </div>

        <div class="ml-20 w-1/2">
          <h3>Seleccione la especialidad:</h3>
          <select v-model="selectedProfession" id="profession" class="border bg-transparent rounded-lg px-4 py-2 w-full">
            <option v-for="option in professionOptions" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="mx-auto">
        <button @click="checkAvailability"
          :class="{ 'bg-primary text-white hover:text-lgray': !isButtonDisabled, 'bg-transparent text-gray-500 border-gray-200 border': isButtonDisabled }"
          :disabled="isButtonDisabled" class="text-left px-8 py-2 rounded-md">
          Ver Disponibilidad
        </button>
      </div>

      <div v-if="availabilities.length > 0">
        <table class="table-auto mx-auto">
          <thead>
            <tr>
              <th class="border px-4 py-2">Fecha</th>
              <th class="border px-4 py-2">Horario</th>
              <th class="border px-4 py-2">Especialidad</th>
              <th class="border px-4 py-2">Doctor</th>
              <th class="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="availability in availabilities" :key="availability.id">
              <td class="border px-4 py-2">{{ formatDay(availability.date) }}</td>
              <td class="border px-4 py-2">{{ formatHour(availability.Module) }}</td>
              <td class="border px-4 py-2">{{ formatProfession(availability.User) }}</td>
              <td class="border px-4 py-2">{{ formatDoctorName(availability.User) }}</td>
              <td class="border px-4 py-2 mx-auto">
                <div v-if="isAppointend(availability.Appointments)">
                  <div class="bg-transparent text-gray-300 border-gray-300 border rounded-md px-8 py-2">
                    <p class="">Agendada</p>
                  </div>
                </div>
                <div v-else="isAppointend(availability.Appointments)">
                  <button @click="scheduleAppointment(availability)"
                    :class="{ 'bg-primary text-white hover:text-lgray mx-auto': !isButtonDisabled, 'bg-transparent text-gray-500 border-gray-200 border': isButtonDisabled }"
                    :disabled="isButtonDisabled" class="mx-auto px-8 py-2 rounded-md">
                    Agendar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <div v-if="requestedAvailability">
          <p class="text-center text-gray-500">No hay horas disponibles en este momento.</p>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useStore } from 'vuex'
import axios from "axios";

const store = useStore()
const user = store.getters.getUser
const selectedDate = ref(new Date());
const professionOptions = ref([]);
const selectedProfession = ref(null);
const availabilities = ref([]);
const requestedAvailability = ref(false);
const error = ref(null)

onMounted(async () => {
  await fetchOptions();
});

const fetchOptions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/professions");
    professionOptions.value = response.data;
  } catch (error) {
    console.error("Error fetching options:", error);
  }
};

const isButtonDisabled = computed(() => {
  return professionOptions.value.length === 0 || !selectedProfession.value;
})

const checkAvailability = async () => {
  const formattedDate = formatDate(selectedDate.value);
  try {
    const response = await axios.get(`http://localhost:3000/api/schedules/calendar?day=${formattedDate}&professionId=${selectedProfession.value}`);
    availabilities.value = response.data;
    requestedAvailability.value = true
  } catch (e) {
    error.value = e
  }
}

const scheduleAppointment = async (availability) => {
  const data = {
    patientId: user.id,
    scheduleId: availability.id,
    status: "Scheduled"
  }
  try {
    const response = await axios.post(`http://localhost:3000/api/appointments`, data);
    console.log(response)
    checkAvailability()
    router.push({ path: '/my-schedule' })
  } catch (e) {
    error.value = e
  }
}

const isAppointend = (appointments) => {
  return appointments.length > 0
}

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const formatDay = (date) => {
  return formatDate(new Date(date))
}
const formatHour = (module) => {
  return String(module.startHour).padStart(2, '0') + ':00 - ' + String(module.startHour + 1).padStart(2, '0') + ':00'
}
const formatProfession = (user) => {
  return user.Profession.name
}
const formatDoctorName = (user) => {
  return user.name
}

</script>

<style scoped></style>
