<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <article class="prose prose-neutral dark:prose-invert dark:bg-neutral-900 max-w-none">
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </article>
</template>
