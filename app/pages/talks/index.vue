<script setup lang="ts">
const { givenTalks, upcomingTalks } = await useTalks()
</script>

<template>
  <div class="w-full">
    <h1>Talks</h1>

    <template v-if="givenTalks && givenTalks.length">
      <h2>Given Talks</h2>
      <TalkTable v-if="givenTalks" :talks="givenTalks" />
    </template>

    <template v-if="upcomingTalks && upcomingTalks.length">
      <h2>Upcoming Talks</h2>
      <TalkTable v-if="upcomingTalks" :talks="upcomingTalks" />
    </template>
  </div>
</template>