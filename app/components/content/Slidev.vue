<script setup lang="ts">
const { name } = defineProps<{
  name: string
}>()

const url = computed(() => `/slides/${name}`)
</script>

<template>
  <IframeContainer
    :url="url"
    message="Open presentation"
  />
</template>
