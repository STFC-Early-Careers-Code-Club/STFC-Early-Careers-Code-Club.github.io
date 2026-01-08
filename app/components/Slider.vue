<script setup lang="ts" generic="T extends string | number">
const modelValue = defineModel<T>({ required: true })

const props = defineProps<{
  options: readonly T[]
}>()

function select(option: T) {
  modelValue.value = option
}

onMounted(async () => {
  await nextTick()
})
</script>

<template>
  <div
    ref="container"
    class="not-prose rounded-full bg-neutral-100 dark:bg-neutral-800 backdrop-blur-md p-1 flex w-fit gap-2"
  >
    <button
      v-for="option in options"
      :key="String(option)"
      ref="buttons"
      class="rounded-full px-2 py-0.5 transition-colors duration-200 ease-out"
      :class="
        option === modelValue
          ? 'bg-white dark:bg-neutral-700 text-black dark:text-white'
          : 'text-neutral-600 dark:text-neutral-300'
      "
      @click="select(option)"
    >
      {{ option }}
    </button>
  </div>
</template>