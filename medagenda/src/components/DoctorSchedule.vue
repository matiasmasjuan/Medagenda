<template class="flex-grow">
  <div class="mx-auto mt-20 mb-20">
    <div class="mx-auto grid">
      <div v-if="schedules.length > 0">
        <table class="table-auto mx-auto">
          <thead>
            <tr>
              <th class="border px-4 py-2">Fecha</th>
              <th class="border px-4 py-2">Horario</th>
              <th class="border px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="schedule in schedules" :key="schedule.id">
              <td class="border px-4 py-2">{{ getDate(schedule) }}</td>
              <td class="border px-4 py-2">{{ getModule(schedule) }}</td>
              <td class="border px-4 py-2">{{ getAppointmentStatus(schedule) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <p class="text-center text-gray-500">No hay horas disponibles en este momento.</p>
      </div>

      <div class="pt-10">
        <p class="text-xl text-center">Nueva Disponibilidad:</p>
      </div>

      <div class="flex mx-auto py-4">
        <div class="w-2/5 ml-10">
          <h3>Fecha de consulta:</h3>
          <VueDatePicker v-model="selectedDate" :min-date="new Date()" placeholder="Selecciona el día"
            :enable-time-picker="false" />
        </div>

        <div class="w-2/5 ml-10">
          <h3>Seleccione módulo:</h3>
          <select v-model="selectedModule" id="module" class="border bg-transparent rounded-lg px-4 py-2 w-full">
            <option v-for="module in moduleOptions" :key="module.id" :value="module.id">
              {{ formatHour(module) }}
            </option>
          </select>
        </div>
      </div>

      <div class="mx-auto mt-10">
        <button @click="newSchedule" class="px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
          Agregar Nueva Disponibilidad
        </button>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from "axios";
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const user = store.getters.getUser
const schedules = ref([]);
const selectedDate = ref(new Date());
const moduleOptions = ref([]);
const selectedModule = ref(null);

onMounted(async () => {
  await fetchSchedules();
  await fetchModules()
});

const fetchSchedules = async () => {
  try {
    const responseSchedules = await axios.get(`${import.meta.env.VITE_API_URL}/api/schedules?doctorId=${user.id}`);
    schedules.value = responseSchedules.data;
  } catch (e) {
    error.value = e
  }
};
const fetchModules = async () => {
  try {
    const responseModules = await axios.get(`${import.meta.env.VITE_API_URL}/api/modules`);
    moduleOptions.value = responseModules.data;
  } catch (e) {
    error.value = e
  }
};

const newSchedule = async () => {
  const data = {
    doctorId: user.id,
    date: selectedDate.value,
    moduleId: selectedModule.value
  }
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/schedules`, data);
    fetchSchedules()
  } catch (e) {
    error.value = e
  }
}

const getDate = (data) => {
  return formatDate(data.date)
}

const getModule = (data) => {
  return formatHour(data.Module)
}

const getAppointmentStatus = (data) => {
  if (data.Appointments.length > 0) {
    return translateAppointmentStatus(data.Appointments[0].status)
  }
  return 'Disponible'
}

const translateAppointmentStatus = (status) => {
  const translations = {
    Canceled: 'Cancelado',
    Scheduled: 'Agendado',
    Completed: 'Completado'
  }
  return translations[status]
}

const formatDate = (data) => {
  const date = new Date(data)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const formatHour = (module) => {
  return String(module.startHour).padStart(2, '0') + ':00 - ' + String(module.startHour + 1).padStart(2, '0') + ':00'
}


</script>

<style scoped></style>
