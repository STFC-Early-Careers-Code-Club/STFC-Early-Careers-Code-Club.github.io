<script setup lang="ts">
const { givenTalks } = await useTalks()

const scoreboard = computed(() => {
  const speakerScoreMap = givenTalks.value?.reduce((acc, talk) => {
    acc[talk.speaker] = (acc[talk.speaker] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (speakerScoreMap === undefined) {
    return [] 
  }

  return Object.entries(speakerScoreMap).map(([speaker, count]) => ({
    speaker,
    count
  })).sort((a, b) => b.count - a.count)
})
</script>

<template>
  <h2>Speaker Scoreboard</h2>
  <table>
    <thead>
      <tr>
        <th>Speaker</th>
        <th>Number of Talks</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in scoreboard" :key="entry.speaker">
        <td>{{ entry.speaker }}</td>
        <td>{{ entry.count }}</td>
      </tr>
    </tbody>
  </table>
</template>