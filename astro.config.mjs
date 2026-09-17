// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [keystatic(), react()],
});
