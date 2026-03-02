<script setup lang="ts">
import type { Talk } from '~/lib/sanitiseTalksCollectionItem';

const props = defineProps<{
  talk: Talk
}>()

const person = usePerson(props.talk.speaker)
</script>

<template>
  <UBlogPost
    :title="talk.title"
    :description="talk.description || 'No description available'"
    :date="talk.date"
    :image="talk.imgUrl || '/images/no-image.jpg'"
    :authors="[{
      name: talk.speaker,
      avatar: person?.imgUrl ? {
        src: person.imgUrl,
        icon: 'i-lucide-image'
      } : undefined
    }]"
    :to="talk.path"
    :ui="{
      title: 'break-words whitespace-normal line-clamp-none',
      description: 'break-words whitespace-normal line-clamp-none',
      image: talk.imgUrl
        ? `${talk.imgClass} ${talk.isImgLogo ? 'object-contain p-2' : ''} object-center`
        : 'object-contain dark:invert bg-white'
    }"
  />
</template>