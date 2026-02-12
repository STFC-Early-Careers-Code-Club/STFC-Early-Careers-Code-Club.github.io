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

const { pastTalks, upcomingTalks, todaysTalk } = useTalks()

const talks = computed(() => {
  return status.value === 'upcoming' ? upcomingTalks.value?.toReversed() : pastTalks.value
})
</script>

<template>
  <div class="w-full">
    <h1 class="text-center">Talks</h1>

    <NuxtLink v-if="todaysTalk" class="no-underline text-white cursor-pointer" :to="todaysTalk.path">
      <h2 class="text-center text-sm italic font-light text-neutral-300 mb-1">Today's talk:</h2>

      <div class="relative rounded-lg overflow-hidden mb-4">
        <img
          v-if="todaysTalk.imgUrl"
          :src="todaysTalk.imgUrl"
          class="absolute inset-0 m-0 w-full h-full blur-sm scale-110"
          :class="`${todaysTalk.imgClass} ${todaysTalk.isImgLogo ? 'object-contain p-2' : 'object-cover'}`"
        />
        <div v-else class="bg-neutral-100 dark:bg-neutral-800 absolute inset-0 m-0 w-full h-full" />

        <div class="p-2 relative" :class="{ 'bg-white/80 dark:bg-black/80': todaysTalk.imgUrl }">
          <h3 class="m-0 text-2xl">{{ todaysTalk.title }}</h3>
          <p class="my-2 italic text-sm">
            {{ todaysTalk.speaker }}
          </p>
          <p class="mt-2 mb-0">{{ todaysTalk.description }}</p>
        </div>
      </div>
    </NuxtLink>

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