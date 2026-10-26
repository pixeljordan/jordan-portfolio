// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Pages stay static; only routes with `prerender = false` (the chat API) run as functions.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
