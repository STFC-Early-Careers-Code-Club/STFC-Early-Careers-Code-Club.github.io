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
  <article class="prose prose-neutral dark:prose-invert container mx-auto">
    <template v-if="page">
      <h1>{{ page.title }}</h1>
      <ContentRenderer :value="page" />
    </template>
  </article>
</template>