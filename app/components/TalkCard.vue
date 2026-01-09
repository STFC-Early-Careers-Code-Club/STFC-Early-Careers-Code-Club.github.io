<script setup lang="ts">
defineProps<{
  talk: Talk
}>()
</script>

<template>
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg not-prose border-2 border-neutral-100 dark:border-neutral-800 text-center">
    <img
      :src="talk.imgUrl || '/images/no-image.jpg'"
      :key="talk.path"
      :alt="`Image for ${talk.title}`"
      class="w-full h-48 rounded-md mb-2"
      :class="talk.imgUrl
        ? `${talk.imgClass} ${talk.isImgLogo ? 'object-contain p-2' : 'object-cover'}`
        : 'object-contain dark:invert bg-white'
      "
    />
    <NuxtLink :to="talk.path" class="hover:underline">
      <h2 class="font-bold text-xl dark:text-white">{{ talk.title }}</h2>
      <p class="text-sm">{{ talk.speaker }} - {{ new Date(talk.date).toLocaleDateString() }}</p>
    </NuxtLink>
    <hr class="my-1 mx-8" />
    <p class="px-1">{{ talk.description || 'No description available.' }}</p>
  </div>
</template>