import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const wranglerPath = resolve('dist/server/wrangler.json');

try {
  const config = JSON.parse(readFileSync(wranglerPath, 'utf-8'));
  config.pages_build_output_dir = '../';
  writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
  console.log('[postbuild] Added pages_build_output_dir to dist/server/wrangler.json');
} catch (e) {
  console.warn('[postbuild] Could not modify wrangler.json:', e.message);
}
