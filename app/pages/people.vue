<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { Person } from '#imports';
import { ROLE_ICONS } from '~/lib/roles';

const { people } = usePeople()

const UUser = resolveComponent('UUser')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns: TableColumn<Person>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-chevron-down',
        square: true,
        'aria-label': 'Expand',
        disabled: row.original.talks.length === 0,
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        onClick: () => row.toggleExpanded()
      })
  },
  {
    header: 'Name',
    cell: ({ row }) => {
      const { name, title, imgUrl } = row.original

      return h(UUser, {
        name,
        description: title,
        avatar: imgUrl ? {
          src: imgUrl,
          icon: 'i-lucide-image'
        } : undefined
      })
    }
  },
  {
    header: 'Roles',
    accessorKey: 'roles',
    cell: ({ row }) => {
      const roles = row.original.roles

      return h(
        'div',
        { class: 'flex gap-1' },
        roles.map(role => h(
          UBadge,
          {
            variant: 'subtle',
            icon: ROLE_ICONS[role]
          },
          () => role
        )
      ))
    }
  },
  {
    header: 'Talks',
    accessorFn: row => row.talks.length,
  }
]

const title = "People"
const description = "Meet the people who have contributed to ECCC."

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
    <UTable
      :data="people"
      :columns="columns"
    >
      <template #expanded="{ row }">
        <UBlogPosts>
          <TalkBlogEntry v-for="talk in row.original.talks" :talk="talk" />
        </UBlogPosts>
      </template>
    </UTable>
  </UPageBody>
</template>