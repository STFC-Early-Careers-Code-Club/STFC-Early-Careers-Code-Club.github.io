<script setup lang="ts">
type Status = 'upcoming' | 'past'
function isStatus(value: string): value is Status {
  return value === 'upcoming' || value === 'past'
}
const status = useQueryParam<Status>('status', val => isStatus(val) ? val : 'upcoming')

const STYLE_QUERY_KEY = 'style'
type Style = 'table' | 'tiles'
function isStyle(value: string): value is Style {
  return value === 'table' || value === 'tiles'
}
const style = useQueryParam<Style>(STYLE_QUERY_KEY, val => isStyle(val) ? val : 'tiles')

const { pastTalks, upcomingTalks, todaysTalk } = useTalks()

const talks = computed(() => {
  return status.value === 'upcoming' ? upcomingTalks.value?.toReversed() : pastTalks.value
})

const title = 'Talks'
const description = 'Browse through our collection of talks.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <UPageHeader
    :title="title"
    :description="description"
  />

  <UPageBody>
    <UPageCTA
      v-if="todaysTalk"
      :title="`Todays Talk: ${todaysTalk.title}`"
      :description="`${todaysTalk.speaker} - ${todaysTalk.description}`"
      variant="naked"
      orientation="horizontal"
      :links="[
        {
          label: 'Check it out',
          href: todaysTalk.path
        }
      ]"
    >
      <img
        :key="todaysTalk.path"
        :src="todaysTalk.imgUrl || '/images/no-image.jpg'"
        :alt="`Image for ${todaysTalk.title}`"
        class="w-full h-48 rounded-md mb-2"
        :class="todaysTalk.imgUrl
          ? `${todaysTalk.imgClass} ${todaysTalk.isImgLogo ? 'object-contain p-2' : 'object-cover'}`
          : 'object-contain dark:invert bg-white'
        "
      >
    </UPageCTA>

    <ClientOnly>
      <div class="flex flex-col sm:flex-row gap-2 justify-center mb-4">
        <UTabs
          v-model="style"
          :items="[
            {
              label: 'Tiles',
              icon: 'i-lucide-grid-2x2',
              value: 'tiles'
            },
            {
              label: 'Table',
              icon: 'i-lucide-table',
              value: 'table'
            }
          ]"
        />

        <UTabs
          v-model="status"
          :items="[
            {
              label: 'Upcoming',
              icon: 'i-lucide-message-circle-dashed',
              value: 'upcoming'
            },
            {
              label: 'Past',
              icon: 'i-lucide-message-circle',
              value: 'past'
            }
          ]"
        />
      </div>
    </ClientOnly>

    <template v-if="talks">
      <TalkTable
        v-if="style === 'table'"
        :talks="talks"
      />

      <UBlogPosts v-else>
        <TalkBlogEntry
          v-for="talk in talks"
          :key="talk.id"
          :talk="talk"
        />
      </UBlogPosts>
    </template>
  </UPageBody>
</template>
