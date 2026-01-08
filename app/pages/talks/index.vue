<script setup lang="ts">
const { pastTalks, upcomingTalks } = useTalks()

type Status = 'upcoming' | 'past'
const status = ref<Status>('upcoming')

type Style = 'table' | 'cards'
const style = ref<Style>('cards')

const talks = computed(() => {
  return status.value === 'upcoming' ? upcomingTalks.value?.toReversed() : pastTalks.value
})
</script>

<template>
  <div class="w-full">
    <h1>Talks</h1>

    <p><NuxtLink to="/speaker-scoreboard">Speaker Scoreboard</NuxtLink></p>

    <div class="flex gap-2 justify-center">
      <Slider v-model="status" :options="[ 'upcoming', 'past' ]"></Slider>
      <Slider v-model="style" :options="[ 'cards', 'table' ]"></Slider>

    </div>

    <template v-if="talks && talks.length">
      <h2>{{ status === 'upcoming' ? 'Upcoming Talks' : 'Past Talks' }}</h2>
      <TalkTable v-if="style === 'table'" :talks="talks" />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div v-for="talk in talks" :key="talk.id" class="bg-neutral-100 dark:bg-neutral-800 rounded-lg not-prose border-2 border-neutral-100 dark:border-neutral-800 text-center">
          <img
            :src="talk.imgUrl || '/images/no-image.jpg'"
            :alt="`Image for ${talk.title}`"
            class="w-full h-48 rounded-md mb-2"
            :class="`${talk.imgClass} ${talk.imgUrl ? '' : 'dark:invert'} ${talk.isImgLogo ? 'object-contain' : 'object-cover'}`"/>
          <NuxtLink :to="talk.path" class="hover:underline">
            <h3 class="font-bold text-xl dark:text-white">{{ talk.title }}</h3>
            <p class="text-sm">{{ talk.speaker }} - {{ new Date(talk.date).toLocaleDateString() }}</p>
          </NuxtLink>
          <hr class="my-1 mx-8" />
          <p class="px-1">{{ talk.description || 'No description available.' }}</p>
        </div>
      </div>
    </template>
  </div>
</template>