<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <IframeContainer
    :url="url"
    message="Open recording in new tab"
  />
</template>
