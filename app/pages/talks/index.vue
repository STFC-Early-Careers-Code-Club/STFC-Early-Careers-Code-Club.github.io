<script setup lang="ts">
type Status = 'upcoming' | 'past'
function isStatus(value: any): value is Status {
  return value === 'upcoming' || value === 'past'
}
const status = useQueryParam<Status>('status', val => isStatus(val) ? val : 'upcoming')

const STYLE_QUERY_KEY = 'style'
type Style = 'table' | 'cards'
function isStyle(value: any): value is Style {
  return value === 'table' || value === 'cards'
}
const style = useQueryParam<Style>(STYLE_QUERY_KEY, val => isStyle(val) ? val : 'cards')

const { pastTalks, upcomingTalks } = useTalks()

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