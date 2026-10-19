import { getCollection, type CollectionEntry } from 'astro:content';

export type Essay = CollectionEntry<'essays'>;

export async function getEssays(): Promise<Essay[]> {
  const essays = await getCollection('essays');
  return essays.sort((a, b) => a.data.number - b.data.number);
}

export const pad = (n: number) => String(n).padStart(2, '0');

export const essayHref = (essay: Essay) => `/writing/${essay.id}`;
