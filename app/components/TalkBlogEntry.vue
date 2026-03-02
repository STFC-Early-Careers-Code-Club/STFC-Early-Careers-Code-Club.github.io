<script setup lang="ts">
import type { Talk } from '~/lib/sanitiseTalksCollectionItem';

defineProps<{
  talk: Talk
}>()
</script>

<template>
  <UBlogPost
    :title="talk.title"
    :description="talk.description || 'No description available'"
    :date="talk.date"
    :image="talk.imgUrl || '/images/no-image.jpg'"
    :authors="[{
      name: talk.speaker
    }]"
    :to="talk.path"
    :ui="{
      image: talk.imgUrl
        ? `${talk.imgClass} ${talk.isImgLogo ? 'object-contain p-2' : ''} object-center`
        : 'object-contain dark:invert bg-white'
    }"
  />
</template>