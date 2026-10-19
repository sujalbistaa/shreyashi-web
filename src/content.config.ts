import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const essays = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/essays' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      /** Position in the index. */
      number: z.number().int().positive(),
      year: z.number().int(),
      /** True until the real year of writing is confirmed. Hides datePublished from JSON-LD. */
      yearIsPlaceholder: z.boolean().default(false),
      theme: z.enum(['Gender', 'Nature', 'Climate']),
      /** A sentence quoted verbatim from the essay, used on the index. May start or end with an ellipsis. */
      coverLine: z.string(),
      summary: z.string(),
      words: z.number().int(),
      readingTime: z.number().int(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** The .docx in ./context this essay was converted from. */
      source: z.string(),
    }),
});

export const collections = { essays };
