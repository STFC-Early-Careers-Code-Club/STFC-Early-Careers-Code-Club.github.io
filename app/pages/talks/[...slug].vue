<script setup lang="ts">
const route = useRoute()

const talk = await useTalk(route.path)

if (!talk.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <article class="w-full">
    <template v-if="talk">
      <h1 class="mb-2">{{ talk.title }}</h1>
      <p class="my-2 italic text-sm">{{ talk.speaker }} - {{ talk.date.toLocaleDateString() }}</p>
      <img
        v-if="talk.imgUrl"
        :src="talk.imgUrl"
        class="my-2 w-full h-48 rounded"
        :class="`${talk.imgClass} ${talk.isImgLogo ? 'object-contain p-2' : 'object-cover'}`"
      />
      <p class="my-2">{{ talk.description }}</p>
      <hr class="mt-2">
      <ContentRenderer :value="talk" />
    </template>
  </article>
</template>