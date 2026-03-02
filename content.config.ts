import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
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
        date: z.date(),
        recordingUrl: z.string().optional(),
      })
    })
  }
})
