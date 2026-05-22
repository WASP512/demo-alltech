import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('AllTech'),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),                  // can be "Confidential" if NDA
    industry: z.string(),
    services: z.array(z.string()),       // e.g. ["Incident Response", "Darktrace"]
    summary: z.string(),                 // shows on listing page
    outcome: z.string(),                 // one-line result
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, caseStudies };
