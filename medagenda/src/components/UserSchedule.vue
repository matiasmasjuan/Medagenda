<template class="flex-grow">
  <div class="mx-auto mt-20 mb-20">
    <div class="mx-auto grid">
      <div v-if="appointments.length > 0">
        <table class="table-auto mx-auto">
          <thead>
            <tr>
              <th class="border px-4 py-2">Fecha</th>
              <th class="border px-4 py-2">Horario</th>
              <th class="border px-4 py-2">Especialidad</th>
              <th class="border px-4 py-2">Doctor</th>
              <th class="border px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td class="border px-4 py-2">{{ getDate(appointment) }}</td>
              <td class="border px-4 py-2">{{ getModule(appointment) }}</td>
              <td class="border px-4 py-2">{{ getProfession(appointment) }}</td>
              <td class="border px-4 py-2">{{ getDoctorName(appointment) }}</td>
              <td class="border px-4 py-2">{{ getAppointmentStatus(appointment) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <p class="text-center text-gray-500">No tienes agendada ninguna hora.</p>
      </div>

      <div class="mx-auto mt-10">
        <RouterLink :to="{ name: 'scheduler' }">
          <button class="px-8 py-2 bg-primary text-white hover:text-lgray rounded-md">
            Agendar Nueva Hora
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
const appointments = ref([]);

onMounted(async () => {
  await fetchAppointments();
});

const fetchAppointments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/appointments?patientId=${user.id}`);
    appointments.value = response.data;
  } catch (e) {
    error.value = e
  }
};

const getDate = (data) => {
  return formatDate(data.Schedule.date)
}

const getModule = (data) => {
  return formatHour(data.Schedule.Module)
}

const getProfession = (data) => {
  return data.Schedule.User.Profession.name
}

const getDoctorName = (data) => {
  return data.Schedule.User.name
}

const getAppointmentStatus = (data) => {
  return data.status
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
