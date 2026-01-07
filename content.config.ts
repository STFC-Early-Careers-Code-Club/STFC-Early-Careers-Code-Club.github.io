import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),

    talks: defineCollection({
      type: 'page',
      source: 'talks/**/*.md',
      schema: z.object({
        title: z.string(),
        speaker: z.string(),
        date: z.string(),
      })
    })
  }
})