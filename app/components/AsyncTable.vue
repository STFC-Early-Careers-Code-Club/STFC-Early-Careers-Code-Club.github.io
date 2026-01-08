<script setup lang="ts" generic="T extends Record<string, any>">
export interface AsyncTableError {
  message: string
}

defineProps<{
  data?: T[]
  error?: AsyncTableError
  columns: string[]
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="error">
        <td :colspan="columns.length" class="text-center text-red-500">
          Error: {{ error.message }}
        </td>
      </tr>
      <tr v-else-if="!data">
        <td :colspan="columns.length" class="text-center">
          Loading...
        </td>
      </tr>
      <tr v-else-if="data && data.length === 0">
        <td :colspan="columns.length" class="text-center">
          No data found.
        </td>
      </tr>
      <template v-else-if="data">
        <slot />
      </template>
    </tbody>
  </table>
</template>