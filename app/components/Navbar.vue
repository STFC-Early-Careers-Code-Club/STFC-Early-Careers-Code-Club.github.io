<script setup lang="ts">
interface Link {
  name: string
  path: string
}

const links: Link[] = [
  { name: 'Home', path: '/' },
  { name: 'Talks', path: '/talks' },
  { name: 'Talk Requests', path: '/talk-requests' },
]
</script>

<template>
  <nav class="bg-blue-500 text-white h-12 sticky top-0 z-50 flex justify-between items-center">
    <NuxtLink to="/" class="flex items-center h-full">
      <img src="/images/little-willow.png" alt="Logo" class="h-full">
      <span class="ml-2 font-bold text-lg">STFC Early Careers Code Club</span>
    </NuxtLink>

    <div class="flex items-center gap-4">
      <ul class="flex gap-4">
        <li v-for="link in links" :key="link.name">
          <NuxtLink :to="link.path" class="hover:underline">{{ link.name }}</NuxtLink>
        </li>
      </ul>

      <NuxtLink to="https://github.com/STFC-Early-Careers-Code-Club/STFC-Early-Careers-Code-Club.github.io">
        <IconGithub class="h-8 w-8 fill-white mr-4 my-auto" />
      </NuxtLink>
    </div>
  </nav>
</template>