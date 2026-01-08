<script setup lang="ts">
import ApexChart, { type VueApexChartsComponentProps } from 'vue3-apexcharts'

const { pastTalks } = useTalks()

const scoreboard = computed(() => {
  const speakerScoreMap = pastTalks.value?.reduce((acc, talk) => {
    acc[talk.speaker] = (acc[talk.speaker] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (speakerScoreMap === undefined) {
    return [] 
  }

  return Object.entries(speakerScoreMap).map(([speaker, count]) => ({
    speaker,
    count
  })).sort((a, b) => b.count - a.count)
})

const allDates = computed(() => {
  if (!pastTalks.value) return []
  const dates = pastTalks.value.map((t) => t.date)
  dates.sort((a, b) => a.getTime() - b.getTime())
  return dates
})

const series = computed<number[]>(() => {
  const talks = pastTalks.value
  if (!talks) return []

  const counts = new Map<string, number>()

  for (const talk of talks) {
    counts.set(talk.speaker, (counts.get(talk.speaker) ?? 0) + 1)
  }

  return Array.from(counts.values())
})

const labels = computed<string[]>(() => {
  const talks = pastTalks.value
  if (!talks) return []

  return Array.from(new Set(talks.map(t => t.speaker)))
})

const options: VueApexChartsComponentProps['options'] = {
  chart: {
    type: 'donut'
  },
  labels: labels.value,
  legend: {
    position: 'bottom'
  },
  tooltip: {
    y: {
      formatter: val => `${val} talks`
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%'
      }
    }
  }
}
</script>

<template>
  <h2>Speaker Scoreboard</h2>

  <ClientOnly>
    <div class="bg-white rounded w-full mx-auto">
      <ApexChart
        type="donut"
        height="350"
        :options="options"
        :series="series"
      />
    </div>
  </ClientOnly>

  <AsyncTable
    :data="scoreboard"
    :columns="['Speaker', 'Number of Talks']"
  >
    <tr v-for="entry in scoreboard" :key="entry.speaker">
      <td>{{ entry.speaker }}</td>
      <td>{{ entry.count }}</td>
    </tr>
  </AsyncTable>
</template>