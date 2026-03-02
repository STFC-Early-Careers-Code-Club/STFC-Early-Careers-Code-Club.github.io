<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { Person } from '#imports';

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
        avatar: {
          src: imgUrl,
          icon: 'i-lucide-image'
        }
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
        roles.map(role => h(UBadge, { variant: 'subtle' }, () => role)
      ))
    }
  },
  {
    header: 'Talks',
    accessorFn: row => row.talks.length,
  }
]
</script>

<template>
  <UPageHeader title="People" />

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