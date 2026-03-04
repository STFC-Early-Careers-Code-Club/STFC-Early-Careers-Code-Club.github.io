import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    people: defineCollection({
      type: 'data',
      source: 'people/*.yml',
      schema: z.object({
        name: z.string(),
        title: z.string(),
        roles: z.array(z.string()),
        imgUrl: z.string().optional(),
      })
    }),

    talks: defineCollection({
      type: 'page',
      source: 'talks/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        imgUrl: z.string().optional(),
        isImgLogo: z.boolean().optional(),
        imgClass: z.string().optional(),
        speaker: z.string(),
        date: z.date().optional(),
        recordingUrl: z.string().optional(),
      })
    })
  }
})
