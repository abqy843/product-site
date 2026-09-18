import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const wranglerPath = resolve('dist/server/wrangler.json');

try {
  const original = JSON.parse(readFileSync(wranglerPath, 'utf-8'));

  const pagesConfig = {
    name: original.name || 'product-site',
    main: original.main || 'entry.mjs',
    compatibility_date: original.compatibility_date || '2026-09-17',
    compatibility_flags: ['nodejs_compat'],
    assets: {
      directory: original.assets?.directory || '../client',
    },
    rules: original.rules,
    pages_build_output_dir: '../',
    no_bundle: true,
  };

  writeFileSync(wranglerPath, JSON.stringify(pagesConfig, null, 2));
  console.log('[postbuild] Rebuilt dist/server/wrangler.json for Cloudflare Pages');
} catch (e) {
  console.warn('[postbuild] Could not modify wrangler.json:', e.message);
}
