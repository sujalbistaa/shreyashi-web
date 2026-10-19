import type { APIRoute } from 'astro';
import { pngResponse, renderCard, TINTS } from '../../lib/og';

export const GET: APIRoute = async () =>
  pngResponse(
    await renderCard({
      kicker: 'Essays & research',
      title: 'SHREYASHI BISTA',
      italic: 'Conservation researcher, Kathmandu',
      tint: TINTS.default,
      footLeft: 'Writing · Research · About',
      footRight: 'Kathmandu, Nepal',
    }),
  );
