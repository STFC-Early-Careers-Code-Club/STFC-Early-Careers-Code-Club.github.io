<script setup lang="ts">
import { computed, ref } from 'vue'
import { validateEmailManually } from '../utils/validateEmailManually'
import { validateEmailWithRegex } from '../utils/validateEmailWithRegex'

const props = defineProps<{
  useRegex: boolean
}>()

type ValidationMethod = (value: string) => boolean

const validationMethod = computed<ValidationMethod>(() => props.useRegex ? validateEmailWithRegex : validateEmailManually)

const inputValue = ref('test@example.com')

const isValidEmail = computed(() => validationMethod.value(inputValue.value))
</script>

<template>
  <div class="flex flex-col">
    <label for="email">Email</label>
    <input
      v-model="inputValue"
      name="email"
      type="text"
      class="p-1 border bg-transparent"
    >
    <p
      v-if="isValidEmail"
      class="text-green-500"
    >
      Valid email address!
    </p>
    <p
      v-else
      class="text-red-500"
    >
      Please enter a valid email address.
    </p>
  </div>
</template>
