<script setup lang="ts">
const { pastTalks } = useTalks()

const scoreboard = computed<{
  speaker: string
  count: number
}[]>(() => {
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

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  count: {
    name: 'Number of Talks',
    className: 'fill-blue-500'
  },
}))

const topScoreboard = computed(() => scoreboard.value.slice(0, 5))

const xFormatter = (i: number): string => `${topScoreboard.value[i]?.speaker}`
const yFormatter = (tick: number) => tick.toString()

const bestCount = computed(() => scoreboard.value.at(0)?.count || 0)
</script>

<template>
  <h2>Speaker Scoreboard</h2>

  <div class="bg-neutral-100 rounded p-4 pt-8">
    <BarChart
      :data="topScoreboard"
      :height="300"
      :categories="categories"
      :y-axis="['count']"
      :x-num-ticks="topScoreboard.length"
      :y-num-ticks="bestCount"
      :radius="4"
      :y-grid-line="true"
      :x-formatter="xFormatter"
      :y-formatter="yFormatter"
      :hide-legend="true"
      y-label="Number of Talks"
    />
  </div>

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