<script setup lang="ts">
const props = defineProps<{ url: string }>()

const match = props.url.match(/github\.com\/([^/]+)\/([^/]+)/)

const owner = match?.[1]
const repo = match?.[2]?.replace(/\.git$/, '')

const ogImage =
  owner && repo
    ? `https://opengraph.githubassets.com/1/${owner}/${repo}`
    : undefined

const ownerImage = owner
  ? `https://github.com/${owner}.png`
  : undefined
</script>

<template>
  <UBlogPost
    :title="repo"
    description="View repository on GitHub"
    :image="ogImage" 
    :authors="[{
      name: owner,
      avatar: {
        src: ownerImage,
        icon: 'i-lucide-image'
      }
    }]"
    :to="url"
    :ui="{
      header: 'aspect-[2/1]',
      image: 'object-contain',
      body: 'sm:p-4'
    }"
    orientation="horizontal"
    class="xl:w-3/4"
  />
</template>