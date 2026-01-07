<script setup lang="ts">
defineProps<{
  talks: {
    title: string
    speaker: string
    date: Date
    path: string
  }[]
}>()

const router = useRouter()

function goToTalk(talk: { title: string; speaker: string; date: Date; path: string }) {
  router.push(talk.path)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Speaker</th>
        <th>Date</th>
      </tr>
      <tr v-for="talk in talks" :key="talk.title" @click="goToTalk(talk)" class="cursor-pointer hover:underline">
        <td>{{ talk.title }}</td>
        <td>{{ talk.speaker }}</td>
        <td>{{ talk.date.toLocaleDateString() }}</td>
      </tr> 
    </thead>
  </table>
</template>
