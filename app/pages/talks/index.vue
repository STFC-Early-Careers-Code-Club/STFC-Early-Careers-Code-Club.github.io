<script setup lang="ts">
type Status = 'upcoming' | 'past'
function isStatus(value: any): value is Status {
  return value === 'upcoming' || value === 'past'
}
const status = useQueryParam<Status>('status', val => isStatus(val) ? val : 'upcoming')

const STYLE_QUERY_KEY = 'style'
type Style = 'table' | 'blog'
function isStyle(value: any): value is Style {
  return value === 'table' || value === 'blog'
}
const style = useQueryParam<Style>(STYLE_QUERY_KEY, val => isStyle(val) ? val : 'blog')

const { pastTalks, upcomingTalks, todaysTalk } = useTalks()

const talks = computed(() => {
  return status.value === 'upcoming' ? upcomingTalks.value?.toReversed() : pastTalks.value
})

const title = "Talks"
const description = "Browse through our collection of talks."

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
          label: 'Check it out'
        }
      ]"
    >
      <img
        :src="todaysTalk.imgUrl || '/images/no-image.jpg'"
        :key="todaysTalk.path"
        :alt="`Image for ${todaysTalk.title}`"
        class="w-full h-48 rounded-md mb-2"
        :class="todaysTalk.imgUrl
          ? `${todaysTalk.imgClass} ${todaysTalk.isImgLogo ? 'object-contain p-2' : 'object-cover'}`
          : 'object-contain dark:invert bg-white'
        "
      />
    </UPageCTA>

    <div class="flex flex-col sm:flex-row gap-2 justify-center mb-4">
      <UTabs
        v-model="style"
        :items="[
          {
            label: 'Blog',
            icon: 'i-lucide-list',
            value: 'blog'
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
            label: 'Past',
            icon: 'i-lucide-arrow-big-left',
            value: 'past'
          },
          {
            label: 'Upcoming',
            icon: 'i-lucide-arrow-big-right',
            value: 'upcoming'
          }
        ]"
        
      />
    </div>

    <template v-if="talks">
      <TalkTable v-if="style === 'table'" :talks="talks" />

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