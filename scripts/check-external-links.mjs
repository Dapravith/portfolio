#!/usr/bin/env node
// Checks every external URL in src/ (project repositories, profile links).
// Run weekly in CI; exits non-zero if a link is gone.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|tsx)$/.test(name)) files.push(path);
  }
})(root);

// Ignore internal/self links and authenticated service endpoints, not public visitor links.\nconst ignore = [/^https:\/\/dapravith\.vercel\.app/, /example\.com/, /api\.resend\.com/, /^https:\/\/api\.openai\.com\/v1\/chat\/completions(?:[?#]|$)/, /schema\.org/, /resend\.com\/docs/];
const urls = new Set();
for (const file of files) {
  for (const m of readFileSync(file, 'utf8').matchAll(/https:\/\/[^\s'"`)<>]+/g)) {
    const url = m[0].replace(/[.,]$/, '');
    if (!ignore.some((r) => r.test(url))) urls.add(url);
  }
}

// LinkedIn answers automated requests with 999; treat it as "reachable".
const acceptable = (url, status) => (status >= 200 && status < 400) || (url.includes('linkedin.com') && status === 999);

let failed = 0;
for (const url of [...urls].sort()) {
  let status = 0;
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15_000), headers: { 'user-agent': 'portfolio-link-check' } });
    status = res.status;
  } catch (error) {
    status = 0;
    console.error(`  error ${url}: ${error.message}`);
  }
  const ok = acceptable(url, status);
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${status} ${url}`);
}
console.log(`\n${urls.size - failed}/${urls.size} external links reachable`);
process.exit(failed ? 1 : 0);
