import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const wranglerPath = resolve('dist/server/wrangler.json');

const PAGES_UNSUPPORTED_TOP_LEVEL = [
  'connect', 'ai_search_namespaces', 'ai_search', 'agent_memory',
  'secrets_store_secrets', 'artifacts', 'unsafe_hello_world', 'flagship',
  'ratelimits', 'worker_loaders', 'exports', 'python_modules',
  'previews', 'vpc_services', 'vpc_networks',
];

const PAGES_UNSUPPORTED_DEV = ['enable_containers', 'generate_types'];

try {
  const config = JSON.parse(readFileSync(wranglerPath, 'utf-8'));

  config.pages_build_output_dir = '../';

  if (config.assets && config.assets.binding === 'ASSETS') {
    delete config.assets.binding;
  }

  delete config.kv_namespaces;

  for (const key of PAGES_UNSUPPORTED_TOP_LEVEL) {
    delete config[key];
  }

  if (config.dev) {
    for (const key of PAGES_UNSUPPORTED_DEV) {
      delete config.dev[key];
    }
  }

  writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
  console.log('[postbuild] Patched dist/server/wrangler.json for Cloudflare Pages compatibility');
} catch (e) {
  console.warn('[postbuild] Could not modify wrangler.json:', e.message);
}
