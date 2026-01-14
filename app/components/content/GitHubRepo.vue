<script setup lang="ts">
const props = defineProps<{ url: string }>()

const match = props.url.match(/github\.com\/([^/]+)\/([^/]+)/)

const owner = match?.[1]
const repo = match?.[2]?.replace(/\.git$/, '')

const ogImage =
  owner && repo
    ? `https://opengraph.githubassets.com/1/${owner}/${repo}`
    : null
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener"
    class="underline decoration-dotted cursor-pointer"
  >
    <img
      v-if="ogImage"
      :src="ogImage"
      alt=""
      class="not-prose block w-1/2"
    />
    <span>
      Visit {{ owner }}/{{ repo }} on GitHub
    </span>
  </a>
</template>