import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';

const distDir = resolve('dist');
const clientDir = join(distDir, 'client');
const serverDir = join(distDir, 'server');
const workerDir = join(distDir, '_worker.js');

function copyDirContents(src, dest) {
  if (!existsSync(src)) return;
  for (const item of readdirSync(src)) {
    const srcPath = join(src, item);
    const destPath = join(dest, item);
    if (statSync(srcPath).isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyDirContents(srcPath, destPath);
    } else {
      const content = readFileSync(srcPath);
      writeFileSync(destPath, content);
    }
  }
}

function removeDir(dir) {
  try {
    execSync(`rmdir /s /q "${dir}"`, { stdio: 'ignore' });
  } catch {
    try {
      execSync(`rm -rf "${dir}"`, { stdio: 'ignore' });
    } catch {}
  }
}

try {
  copyDirContents(clientDir, distDir);
  removeDir(clientDir);

  mkdirSync(workerDir, { recursive: true });
  copyDirContents(serverDir, workerDir);
  removeDir(serverDir);

  const entryPath = join(workerDir, 'entry.mjs');
  const indexPath = join(workerDir, 'index.js');
  if (existsSync(entryPath)) {
    const content = readFileSync(entryPath, 'utf-8');
    writeFileSync(indexPath, content);
    try { execSync(`del /f "${entryPath}"`, { stdio: 'ignore' }); } catch {}
  }

  const wranglerPath = join(workerDir, 'wrangler.json');
  if (existsSync(wranglerPath)) {
    try { execSync(`del /f "${wranglerPath}"`, { stdio: 'ignore' }); } catch {}
  }

  console.log('[postbuild] Restructured dist/ for Cloudflare Pages _worker.js mode');
} catch (e) {
  console.warn('[postbuild] Failed:', e.message);
}
