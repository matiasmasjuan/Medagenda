<template>
  <main class="flex-grow">
    <div class="mx-auto mt-20 w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 mb-20">
      <div class="mx-auto p-10 rounded-lg justify-center grid gap-y-4 w-full border space-y-8">
        <p class="text-2xl text-center">Mi Agenda 🗓</p>
        <UserSchedule />
      </div>
    </div>
  </main>
</template>

<script setup>
import UserSchedule from '../components/UserSchedule.vue'
</script>

<style lang="scss" scoped></style>