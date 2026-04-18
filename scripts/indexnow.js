#!/usr/bin/env node
// Submit all canonical site URLs to IndexNow.
// IndexNow is a ping protocol: one POST notifies Bing + Yandex + partners
// that the listed URLs have changed. Bing account signup is NOT required —
// the .txt key file at /<KEY>.txt is the authentication.
//
// Runs automatically on Vercel production builds (via `postbuild`).
// Manual: INDEXNOW_FORCE=1 node scripts/indexnow.js

import { getAllPaths } from '../src/routes.js';

const HOST = 'priceadeck.com';
const KEY = 'b05f0b4e6c7a31501a01b182272ed1d4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const isProd = process.env.VERCEL_ENV === 'production';
const isForced = process.env.INDEXNOW_FORCE === '1';

if (!isProd && !isForced) {
  console.log('[indexnow] Skipping — not a production build. Use INDEXNOW_FORCE=1 to override.');
  process.exit(0);
}

const urls = getAllPaths().map(p => `https://${HOST}${p === '/' ? '' : p}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

console.log(`[indexnow] Submitting ${urls.length} URLs to ${ENDPOINT}`);

try {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  console.log(`[indexnow] ${res.status} ${res.statusText}${text ? ' — ' + text.slice(0, 200) : ''}`);
} catch (err) {
  console.error(`[indexnow] Submission failed (non-fatal): ${err.message}`);
}

process.exit(0);
