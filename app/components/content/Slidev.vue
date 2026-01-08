<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <div>
    <iframe
      :src="url"
      class="w-full aspect-video border-0"
      allowfullscreen
    ></iframe>
    <NuxtLink :to="url">Open Presentation in new tab</NuxtLink>
  </div>
</template>