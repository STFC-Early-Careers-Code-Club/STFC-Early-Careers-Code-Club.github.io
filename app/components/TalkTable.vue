<script setup lang="ts">
import type { AsyncTableError } from './AsyncTable.vue';

defineProps<{
  talks?: {
    title: string
    speaker: string
    date: Date
    path: string
  }[],
  error?: AsyncTableError
}>()
</script>

<template>
  <AsyncTable
    :data="talks"
    :error="error"
    :columns="['Title', 'Speaker', 'Date']"
  >
    <tr v-for="talk in talks" :key="talk.title" @click="navigateTo(talk.path)" class="cursor-pointer hover:underline">
      <td>{{ talk.title }}</td>
      <td>{{ talk.speaker }}</td>
      <td>{{ talk.date.toLocaleDateString() }}</td>
    </tr> 
  </AsyncTable>
</template>
