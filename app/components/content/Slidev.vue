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
    <a :href="url" target="_blank" rel="noopener">
      Open Presentation in new tab
    </a>
  </div>
</template>