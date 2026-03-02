<script setup lang="ts">
defineProps<{
  url: string
  message: string
}>()
</script>

<
<template>
  <UCard
    :ui="{
      body: 'p-0 sm:p-0'
    }" 
  >
    <iframe
      :src="url"
      class="w-full border-0 aspect-video"
      allowfullscreen
    ></iframe>

    <template #footer>
      <UButton
        :to="url"
        target="_blank"
        icon="i-lucide-external-link"
        variant="ghost"
      >
        {{ message }}
      </UButton>
    </template>
  </UCard>
</template>