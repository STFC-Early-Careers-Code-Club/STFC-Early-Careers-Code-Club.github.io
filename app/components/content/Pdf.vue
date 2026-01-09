<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <div>
    <iframe
      :src="url"
      class="w-full h-full border-0"
      allowfullscreen
    ></iframe>
    <NuxtLink :to="url">Open PDF in new tab</NuxtLink>
  </div>
</template>