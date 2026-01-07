<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('talks').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <article class="w-full">
    <template v-if="page">
      <h1>{{ page.title }}</h1>
      <p><span class="font-bold">Speaker:</span> {{ page.speaker }}</p>
      <p><span class="font-bold">Date:</span> {{ new Date(page.date).toLocaleDateString() }}</p>
      <hr>
      <ContentRenderer :value="page" />
    </template>
  </article>
</template>