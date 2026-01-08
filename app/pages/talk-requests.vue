<script setup lang="ts">
const { talkRequests, error } = await useTalkRequests()
</script>

<template>
  <h1>Talk Requests</h1>
  <NuxtLink to="https://github.com/STFC-Early-Careers-Code-Club/STFC-Early-Careers-Code-Club.github.io/issues/new?template=request-to-present-a-talk.md">Create a Talk Request</NuxtLink>
  <AsyncTable
    :data="talkRequests"
    :error="error"
    :columns="['Title', 'Requested by']" 
  >
    <tr
      v-for="request in talkRequests"
      :key="request.url"
      @click="navigateTo(request.url, { external: true })"
      class="cursor-pointer hover:underline"
    >
      <td>{{ request.title }}</td>
      <td>{{ request.user }}</td>
    </tr>
  </AsyncTable>
</template>