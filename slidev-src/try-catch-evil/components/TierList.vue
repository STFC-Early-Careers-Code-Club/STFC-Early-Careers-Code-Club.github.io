<script setup lang="ts">
const TIERS = [
  {
    name: 'S',
    color: 'bg-red-500'
  },
  {
    name: 'A',
    color: 'bg-orange-500'
  },
  {
    name: 'B',
    color: 'bg-yellow-500'
  },
  {
    name: 'C',
    color: 'bg-green-500'
  },
  {
    name: 'D',
    color: 'bg-blue-500'
  },
  {
    name: 'E',
    color: 'bg-indigo-500'
  },
  {
    name: 'F',
    color: 'bg-purple-500'
  }
]
</script>

<template>
  <table class="border-collapse border-2 border-black bg-white text-black ring-2 ring-white">
    <tbody>
      <tr
        v-for="tier in TIERS"
        :key="tier.name"
      >
        <td :class="`${tier.color} border-2 p-4 border-black font-extrabold size-16 text-center`">
          {{ tier.name }}
        </td>
        <td class="border-2 border-black">
          <div class="items-center h-10 flex flex-row gap-2 [&_img]:size-14 [&_img]:object-contain">
            <slot :name="tier.name.toLowerCase()" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
