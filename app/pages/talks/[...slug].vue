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
      <div class="relative rounded-lg overflow-hidden mb-2">
        <img
          v-if="talk.imgUrl"
          :src="talk.imgUrl"
          class="absolute inset-0 m-0 w-full h-full blur-sm scale-110"
          :class="`${talk.imgClass} ${talk.isImgLogo ? 'object-contain p-2' : 'object-cover'}`"
        />
        <div v-else class="bg-neutral-100 dark:bg-neutral-800 absolute inset-0 m-0 w-full h-full" />

        <div class="p-2 relative" :class="{ 'bg-white/80 dark:bg-black/80': talk.imgUrl }">
          <h1 class="mb-2">{{ talk.title }}</h1>
          <p class="my-2 italic text-sm">
            {{ talk.speaker }} - {{ talk.date.toLocaleDateString() }}
          </p>
          <p class="mt-2 mb-0">{{ talk.description }}</p>
        </div>
      </div>
      <ContentRenderer :value="talk" />
    </template>
  </article>
</template>