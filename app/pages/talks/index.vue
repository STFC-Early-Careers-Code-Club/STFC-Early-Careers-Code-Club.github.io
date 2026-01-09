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
    <h1 class="text-center">Talks</h1>

    <div class="flex gap-2 justify-center mb-4">
      <Slider v-model="status" :options="[ 'upcoming', 'past' ]"></Slider>
      <Slider v-model="style" :options="[ 'cards', 'table' ]"></Slider>
    </div>

    <template v-if="talks && talks.length">
      <TalkTable v-if="style === 'table'" :talks="talks" />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TalkCard
          v-for="talk in talks"
          :key="talk.id"
          :talk="talk"
        />
      </div>
    </template>
  </div>
</template>