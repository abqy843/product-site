import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const wranglerPath = resolve('dist/server/wrangler.json');

try {
  const original = JSON.parse(readFileSync(wranglerPath, 'utf-8'));

  const pagesConfig = {
    name: original.name || 'product-site',
    compatibility_date: original.compatibility_date || '2026-09-17',
    compatibility_flags: ['nodejs_compat'],
    pages_build_output_dir: '../',
  };

  writeFileSync(wranglerPath, JSON.stringify(pagesConfig, null, 2));
  console.log('[postbuild] Rebuilt dist/server/wrangler.json for Cloudflare Pages');
} catch (e) {
  console.warn('[postbuild] Could not modify wrangler.json:', e.message);
}
