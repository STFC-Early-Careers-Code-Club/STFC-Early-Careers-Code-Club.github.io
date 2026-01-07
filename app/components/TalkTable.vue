<script setup lang="ts">
defineProps<{
  talks: {
    title: string
    speaker: string
    date: Date
  }[]
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Speaker</th>
        <th>Date</th>
      </tr>
      <tr v-for="talk in talks" :key="talk.title">
        <td>{{ talk.title }}</td>
        <td>{{ talk.speaker }}</td>
        <td>{{ talk.date.toLocaleDateString() }}</td>
      </tr> 
    </thead>
  </table>
</template>
