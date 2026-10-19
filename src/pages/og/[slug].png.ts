import type { APIRoute, GetStaticPaths } from 'astro';
import { getEssays, pad, type Essay } from '../../lib/essays';
import { pngResponse, renderCard, TINTS } from '../../lib/og';

export const getStaticPaths = (async () => {
  const essays = await getEssays();
  return essays.map((essay) => ({ params: { slug: essay.id }, props: { essay } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ essay: Essay }> = async ({ props }) => {
  const d = props.essay.data;
  return pngResponse(
    await renderCard({
      number: pad(d.number),
      kicker: 'Writing',
      title: d.title,
      italic: d.subtitle,
      tint: TINTS[d.theme],
      footLeft: d.theme,
      footRight: `${d.readingTime} min read`,
    }),
  );
};
