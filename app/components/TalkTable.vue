<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import type { Talk } from '~/lib/sanitiseTalksCollectionItem'

type TableTalk = Pick<Talk, 'title' | 'speaker' | 'date' | 'path'>

const { talks } = defineProps<{
  talks: TableTalk[]
}>()

const columns: TableColumn<TableTalk>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'speaker',
    header: 'Speaker'
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.original.date.toLocaleDateString()
  }
]

function onRowSelect(_: Event, row: TableRow<TableTalk>) {
  navigateTo(row.original.path)
}
</script>

<template>
  <UTable
    :data="talks"
    :columns="columns"
    class="flex-1"
    :ui="{
      tr: 'cursor-pointer'
    }"
    @select="onRowSelect"
  />
</template>
