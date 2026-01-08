<script setup lang="ts">
const { talkRequests } = await useTalkRequests()
</script>

<template>
  <h1>Talk Requests</h1>
  <NuxtLink to="https://github.com/STFC-Early-Careers-Code-Club/STFC-Early-Careers-Code-Club.github.io/issues/new?template=request-to-present-a-talk.md">Create a Talk Request</NuxtLink>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Requested by</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="talkRequests && talkRequests.length">
        <tr
          v-for="request in talkRequests"
          :key="request.url"
          @click="navigateTo(request.url, { external: true })"
          class="cursor-pointer hover:underline"
        >
          <td>{{ request.title }}</td>
          <td>{{ request.user }}</td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="2" class="text-center">No talk requests found.</td>
      </tr>
    </tbody>
  </table>
</template>