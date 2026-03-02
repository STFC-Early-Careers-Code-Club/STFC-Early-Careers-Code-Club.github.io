<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'talk'
})

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const talk = await useTalk(route.path)

if (!talk.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const speaker = usePerson(talk.value.speaker)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('talks', route.path, {
    fields: ['description'],
  }).order('date', 'ASC')
})

const title = talk.value.seo?.title || talk.value.title
const description = talk.value.seo?.description || talk.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = computed(() => findPageHeadline(
  navigation?.value,
  talk.value?.path
))
</script>

<template>
  <UPage v-if="talk">
    <UPageHeader
      :title="talk.title"
      :description="talk.description"
      :headline="headline"
    >
      <template #links>
        <UUser
          v-if="speaker"
          :name="speaker.name"
          :description="speaker.title"
          :avatar="speaker.imgUrl ? {
            src: speaker.imgUrl,
            icon: 'i-lucide-image'
          } : undefined"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <UTabs
        :items="[
          {
            label: 'Content',
            slot: 'content' as const
          },
          {
            label: 'Recording',
            slot: 'recording' as const
          }
        ]"
        variant="link"
      >
        <template #content>
          <ContentRenderer
            v-if="talk && talk.body.value.length"
            :value="talk"
          />
          <UAlert
            v-else
            @click="navigateTo(
              'https://github.com/STFC-Early-Careers-Code-Club',
              { external: true }
            )"
            title="There isn't any content for this talk."
            description="If this is your talk, please add some content by creating a PR on the GitHub."
            color="warning"
            variant="subtle"
            class="cursor-pointer"
          />
        </template>

        <template #recording>
          <TeamsVideo
            v-if="talk.recordingUrl"
            :url="talk.recordingUrl"
          />
          <UAlert
            v-else
            @click="navigateTo(
              'https://github.com/STFC-Early-Careers-Code-Club',
              { external: true }
            )"
            title="There isn't a recording for this talk."
            description="If this is your talk, and a recording was made, please add the recording by creating a PR on the GitHub."
            color="warning"
            variant="subtle"
            class="cursor-pointer"
          />
        </template>
      </UTabs>

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>