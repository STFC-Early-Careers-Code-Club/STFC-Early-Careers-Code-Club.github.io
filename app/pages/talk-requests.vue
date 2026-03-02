<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { GithubIssue } from '~/composables/useGithubIssues';

const { talkRequests, error } = useTalkRequests()

const columns: TableColumn<GithubIssue>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'user',
    header: 'Requested by',
  }
]

function onTalkRequestSelected(_: Event, row: TableRow<GithubIssue>) {
  navigateTo(row.original.url, { external: true })
}

const title = "Talk Requests"
const description = "See the talks that have been requested by the community, or create a new request to present a talk yourself."

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <UPageHeader :title="title" :description="description" />

  <UPageBody>
    <UButton
      to="https://github.com/STFC-Early-Careers-Code-Club/STFC-Early-Careers-Code-Club.github.io/issues/new?template=request-to-present-a-talk.md"
    >
      Submit Talk Request
    </UButton>

    <UTable
      v-if="talkRequests"
      :data="talkRequests"
      :columns="columns"
      @select="onTalkRequestSelected"
      class="flex-1"
      :ui="{
        tr: 'cursor-pointer'
      }"
    />
    <p v-else-if="error" class="text-red-500">Failed to load talk requests: {{ error.message }}</p>
  </UPageBody>
</template>