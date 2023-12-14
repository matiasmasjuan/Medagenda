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

      <div class="mx-auto mt-10">
        <RouterLink :to="{ name: 'scheduler' }">
          <button class="px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
            Agregar Nueva Disponibilidad
          </button>
        </RouterLink>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "axios";
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const user = store.getters.getUser
const schedules = ref([]);

onMounted(async () => {
  await fetchSchedules();
});

const fetchSchedules = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/schedules?doctorId=${user.id}`);
    schedules.value = response.data;
  } catch (e) {
    error.value = e
  }
};

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
