// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site's public address, used for canonical links, the sitemap and share images.
// SITE_URL wins if set; on Netlify, URL is provided automatically (and becomes the custom domain once added).
const site = process.env.SITE_URL ?? process.env.URL ?? 'https://shreyash-web.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
