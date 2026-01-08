<script setup lang="ts">
const { pastTalks, upcomingTalks } = useTalks()
</script>

<template>
  <div class="w-full">
    <h1>Talks</h1>

    <p><NuxtLink to="/speaker-scoreboard">Speaker Scoreboard</NuxtLink></p>

    <template v-if="upcomingTalks && upcomingTalks.length">
      <h2>Upcoming Talks</h2>
      <TalkTable v-if="upcomingTalks" :talks="upcomingTalks.toReversed()" />
    </template>

    <template v-if="pastTalks && pastTalks.length">
      <h2>Past Talks</h2>
      <TalkTable v-if="pastTalks" :talks="pastTalks" />
    </template>
  </div>
</template>