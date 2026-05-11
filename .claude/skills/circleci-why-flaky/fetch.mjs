#!/usr/bin/env node
// Fetch recent CircleCI failure data for LLM-based bucketing.
// Writes one text file per failed job + a summary.txt; LLM classifies with grep.

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';

const API = 'https://circleci.com/api/v2';
const API_V1 = 'https://circleci.com/api/v1.1';
const APP = 'https://app.circleci.com';
const ANSI_RE = /\x1B\[[0-9;]*[A-Za-z]/g;
const LOG_TAIL_BYTES = 4096;

function log(...args) {
  console.error(...args);
}

async function httpGet(url, { token, raw = false, timeoutMs = 30000 } = {}) {
  const headers = { Accept: 'application/json' };
  if (token) headers['Circle-Token'] = token;
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { headers, signal: ctrl.signal });
    if (!r.ok) {
      const err = new Error(`HTTP ${r.status} on ${url}`);
      err.status = r.status;
      throw err;
    }
    return raw ? await r.text() : await r.json();
  } finally {
    clearTimeout(tid);
  }
}

function gitOutput(args) {
  return execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function inferRepo() {
  let url;
  try {
    url = gitOutput('remote get-url origin');
  } catch {
    return null;
  }
  const m = url.match(/(github\.com|bitbucket\.org)[:/]([^/]+)\/([^/.\s]+?)(?:\.git)?\/?$/);
  if (!m) return null;
  return {
    vcs: m[1].includes('github.com') ? 'github' : 'bitbucket',
    org: m[2],
    repo: m[3],
  };
}

function inferBranch() {
  try {
    const b = gitOutput('rev-parse --abbrev-ref HEAD');
    return b && b !== 'HEAD' ? b : null;
  } catch {
    return null;
  }
}

function loadTokenFromCliYml() {
  const p = path.join(os.homedir(), '.circleci', 'cli.yml');
  if (!fs.existsSync(p)) return null;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*token:\s*(\S+)\s*$/);
    if (m && !m[1].startsWith('#')) return m[1];
  }
  return null;
}

function setupInstructions(slug) {
  return [
    '',
    `Cannot read CircleCI data for ${slug}. Project is private (or unreachable) and no valid token was found.`,
    '',
    'Install the CircleCI CLI:',
    '  macOS:  brew install circleci',
    '  Linux:  curl -fLSs https://raw.githubusercontent.com/CircleCI-Public/circleci-cli/main/install.sh | bash',
    '',
    'Then authenticate (writes ~/.circleci/cli.yml):',
    '  circleci setup',
    '',
    'After that, rerun this skill.',
    '',
  ].join('\n');
}

async function checkAccess(slug, token) {
  const probe = `${API}/project/${slug}/pipeline?branch=master`;
  try {
    await httpGet(probe);
    return { ok: true, token: null, mode: 'public' };
  } catch (e) {
    if (![401, 403, 404].includes(e.status)) throw e;
    if (!token) return { ok: false, mode: `private (${e.status})` };
    try {
      await httpGet(probe, { token });
      return { ok: true, token, mode: `private (${e.status}) + token` };
    } catch (e2) {
      return { ok: false, mode: `token rejected (${e2.status ?? '?'})` };
    }
  }
}

async function mapPool(items, fn, concurrency = 16) {
  const out = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const idx = next++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx], idx);
    }
  }
  const n = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: n }, () => worker()));
  return out;
}

async function fetchPipelines(slug, branch, since, token) {
  const out = [];
  let pageToken = null;
  while (true) {
    let url = `${API}/project/${slug}/pipeline?branch=${encodeURIComponent(branch)}`;
    if (pageToken) url += `&page-token=${encodeURIComponent(pageToken)}`;
    const data = await httpGet(url, { token });
    const items = data.items ?? [];
    if (items.length === 0) break;
    let stop = false;
    for (const p of items) {
      const created = new Date(p.created_at);
      if (created < since) {
        stop = true;
        break;
      }
      out.push(p);
    }
    if (stop) break;
    pageToken = data.next_page_token;
    if (!pageToken) break;
  }
  return out;
}

function commitSubject(p) {
  const v = p.vcs?.commit ?? {};
  if (v.subject) return v.subject;
  const msg = p.trigger_parameters?.git?.commit_message ?? '';
  return msg.split('\n', 1)[0].slice(0, 120);
}

function workflowUrl({ vcs, org, repo, pipelineNumber, wfId }) {
  return `${APP}/pipelines/${vcs}/${org}/${repo}/${pipelineNumber}/workflows/${wfId}`;
}

function tailBytes(s, n) {
  if (s.length <= n) return s;
  return s.slice(-n);
}

function writeSummary(outDir, fields) {
  const lines = Object.entries(fields).map(([k, v]) => `${k}=${v}`);
  lines.push('');
  fs.writeFileSync(path.join(outDir, 'summary.txt'), lines.join('\n'));
}

async function main() {
  const { values: args } = parseArgs({
    options: {
      org: { type: 'string' },
      repo: { type: 'string' },
      vcs: { type: 'string' },
      branch: { type: 'string' },
      workflow: { type: 'string' },
      days: { type: 'string', default: '7' },
      max: { type: 'string', default: '200' },
      token: { type: 'string' },
      out: { type: 'string' },
      'cache-dir': { type: 'string' },
    },
  });
  const days = Number.parseInt(args.days, 10);
  const maxJobs = Number.parseInt(args.max, 10);
  if (!args.out) {
    console.error('error: --out <dir> is required.');
    console.error('       Example: mkdir -p .claude/cache && OUT=$(mktemp -d .claude/cache/cci-flake.XXXXXX) && node fetch.mjs --out "$OUT"');
    process.exit(2);
  }
  const outDir = args.out;
  const cacheDir = args['cache-dir'] ?? '.claude/cache/circleci-why-flaky-cache';

  let { vcs, org, repo } = args;
  if (!(vcs && org && repo)) {
    const inferred = inferRepo();
    if (!inferred) {
      console.error('error: cannot infer repo from `git remote get-url origin`.');
      console.error('       Pass --org, --repo, and --vcs explicitly.');
      process.exit(2);
    }
    vcs ??= inferred.vcs;
    org ??= inferred.org;
    repo ??= inferred.repo;
  }
  const branch = args.branch ?? inferBranch() ?? 'master';
  const token = args.token ?? loadTokenFromCliYml();
  const slug = `${vcs === 'github' ? 'gh' : 'bb'}/${org}/${repo}`;

  const access = await checkAccess(slug, token);
  if (!access.ok) {
    console.error(setupInstructions(slug));
    process.exit(3);
  }
  const useToken = access.token;
  const since = new Date(Date.now() - days * 86_400_000);

  // Reset output directory; preserve cross-run log cache for speed.
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(outDir, 'jobs'), { recursive: true });
  fs.mkdirSync(cacheDir, { recursive: true });

  log(`project: ${slug} | branch: ${branch} | window: ${days}d | access: ${access.mode}`);

  let t = Date.now();
  log(`fetching pipelines on ${branch} since ${since.toISOString().slice(0, 10)}...`);
  const pipelines = await fetchPipelines(slug, branch, since, useToken);
  log(`  ${pipelines.length} pipelines  (${((Date.now() - t) / 1000).toFixed(1)}s)`);
  if (pipelines.length === 0) {
    writeSummary(outDir, { PROJECT: slug, BRANCH: branch, DAYS: days, TOTAL_WORKFLOWS: 0, FAILED_WORKFLOWS: 0, FAILED_JOBS: 0 });
    console.log(outDir);
    return;
  }

  t = Date.now();
  log('fetching workflows...');
  const wfsPerPipe = await mapPool(
    pipelines,
    async (p) => {
      const d = await httpGet(`${API}/pipeline/${p.id}/workflow`, { token: useToken });
      return { pipelineId: p.id, wfs: d.items ?? [] };
    },
    16,
  );
  log(`  done (${((Date.now() - t) / 1000).toFixed(1)}s)`);

  const pipeById = new Map(pipelines.map((p) => [p.id, p]));
  const allWfs = [];
  for (const { pipelineId, wfs } of wfsPerPipe) {
    const p = pipeById.get(pipelineId);
    for (const w of wfs) {
      if (args.workflow && w.name !== args.workflow) continue;
      allWfs.push({
        wfId: w.id,
        wfName: w.name,
        status: w.status,
        pipelineNumber: p.number,
        createdAt: w.created_at,
        subject: commitSubject(p),
      });
    }
  }
  const failedWfs = allWfs.filter((w) => w.status === 'failed' || w.status === 'failing');
  const totalWfs = allWfs.length;
  if (totalWfs === 0) {
    const target = args.workflow ? `workflow '${args.workflow}'` : 'any workflow';
    log(`No ${target} runs on '${branch}' in the last ${days} days.`);
    writeSummary(outDir, { PROJECT: slug, BRANCH: branch, DAYS: days, TOTAL_WORKFLOWS: 0, FAILED_WORKFLOWS: 0, FAILED_JOBS: 0 });
    console.log(outDir);
    return;
  }

  const wfCounts = new Map();
  for (const w of allWfs) wfCounts.set(w.wfName, (wfCounts.get(w.wfName) ?? 0) + 1);
  if (!args.workflow) {
    const list = [...wfCounts.entries()].sort((a, b) => b[1] - a[1]).map(([n, c]) => `${n}=${c}`);
    log(`  workflows: ${list.join(', ')}`);
  }
  const failureRate = (100 * failedWfs.length) / totalWfs;
  log(`  failed: ${failedWfs.length}/${totalWfs} (${failureRate.toFixed(1)}%)`);
  if (failedWfs.length === 0) {
    writeSummary(outDir, {
      PROJECT: slug,
      BRANCH: branch,
      DAYS: days,
      TOTAL_WORKFLOWS: totalWfs,
      FAILED_WORKFLOWS: 0,
      FAILURE_RATE_PCT: '0.0',
      FAILED_JOBS: 0,
    });
    console.log(outDir);
    return;
  }

  failedWfs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  let capped = failedWfs;
  if (failedWfs.length > maxJobs) {
    log(`  capping deep analysis at ${maxJobs} (most recent)`);
    capped = failedWfs.slice(0, maxJobs);
  }

  t = Date.now();
  log('fetching failed jobs...');
  const jobsPerWf = await mapPool(
    capped,
    async (w) => {
      const d = await httpGet(`${API}/workflow/${w.wfId}/job`, { token: useToken });
      const failed = (d.items ?? []).filter((j) => j.status === 'failed' || j.status === 'timedout');
      return { wfId: w.wfId, jobs: failed };
    },
    16,
  );
  log(`  done (${((Date.now() - t) / 1000).toFixed(1)}s)`);

  const wfById = new Map(capped.map((w) => [w.wfId, w]));
  const failedJobs = [];
  for (const { wfId, jobs } of jobsPerWf) {
    const w = wfById.get(wfId);
    for (const j of jobs) {
      failedJobs.push({
        ...w,
        jobNumber: j.job_number,
        jobName: j.name,
        jobStatus: j.status,
      });
    }
  }
  log(`  ${failedJobs.length} failed jobs`);

  t = Date.now();
  log('fetching job step details...');
  const detailsByJob = new Map(
    await mapPool(
      failedJobs,
      async (j) => {
        let d;
        try {
          d = await httpGet(`${API_V1}/project/${vcs}/${org}/${repo}/${j.jobNumber}`, { token: useToken });
        } catch {
          return [j.jobNumber, { steps: [], timedOut: false }];
        }
        const out = { steps: [], timedOut: false };
        for (const s of d.steps ?? []) {
          for (const a of s.actions ?? []) {
            if (a.status === 'timedout') out.timedOut = true;
            if (a.failed || a.status === 'failed' || a.status === 'timedout') {
              if (a.output_url) out.steps.push({ name: s.name, url: a.output_url });
            }
          }
        }
        return [j.jobNumber, out];
      },
      16,
    ),
  );
  log(`  done (${((Date.now() - t) / 1000).toFixed(1)}s)`);

  t = Date.now();
  log('downloading step logs...');
  const tasks = [];
  for (const j of failedJobs) {
    const det = detailsByJob.get(j.jobNumber);
    det.steps.forEach((s, i) => tasks.push({ jobNumber: j.jobNumber, idx: i, ...s }));
  }
  const logTexts = new Map();
  await mapPool(
    tasks,
    async (task) => {
      const cachePath = path.join(cacheDir, `${task.jobNumber}_${task.idx}.txt`);
      let text = '';
      if (fs.existsSync(cachePath)) {
        try {
          text = fs.readFileSync(cachePath, 'utf8');
        } catch {
          /* ignore */
        }
      }
      if (!text) {
        try {
          const raw = await httpGet(task.url, { raw: true, timeoutMs: 60000 });
          const messages = JSON.parse(raw)
            .map((m) => m.message ?? '')
            .join('');
          text = messages.replace(ANSI_RE, '');
          try {
            fs.writeFileSync(cachePath, tailBytes(text, 200_000));
          } catch {
            /* ignore */
          }
        } catch {
          text = '';
        }
      }
      logTexts.set(`${task.jobNumber}:${task.idx}`, text);
    },
    24,
  );
  log(`  ${tasks.length} step logs (${((Date.now() - t) / 1000).toFixed(1)}s)`);

  const padWidth = Math.max(4, String(Math.max(failedJobs.length - 1, 0)).length);
  failedJobs.forEach((j, i) => {
    const det = detailsByJob.get(j.jobNumber);
    const parts = det.steps.map((s, k) => {
      const txt = logTexts.get(`${j.jobNumber}:${k}`) ?? '';
      return `### ${s.name}\n${tailBytes(txt, LOG_TAIL_BYTES)}`;
    });
    const header = [
      `INDEX=${i}`,
      `URL=${workflowUrl({ vcs, org, repo, pipelineNumber: j.pipelineNumber, wfId: j.wfId })}`,
      `JOB=${j.jobName}`,
      `WORKFLOW=${j.wfName}`,
      `STATUS=${j.jobStatus}`,
      `TIMED_OUT=${det.timedOut}`,
      `TIME=${j.createdAt}`,
      `COMMIT=${j.subject.replace(/\s+/g, ' ').slice(0, 200)}`,
      '',
      '',
    ].join('\n');
    const file = path.join(outDir, 'jobs', `${String(i).padStart(padWidth, '0')}.txt`);
    fs.writeFileSync(file, header + parts.join('\n\n'));
  });

  writeSummary(outDir, {
    PROJECT: slug,
    BRANCH: branch,
    DAYS: days,
    TOTAL_WORKFLOWS: totalWfs,
    FAILED_WORKFLOWS: failedWfs.length,
    FAILURE_RATE_PCT: failureRate.toFixed(1),
    FAILED_JOBS: failedJobs.length,
    JOBS_DIR: path.join(outDir, 'jobs'),
  });
  log(`wrote ${failedJobs.length} job files to ${path.join(outDir, 'jobs')}/`);
  console.log(outDir);
}

main().catch((e) => {
  console.error(`error: ${e.message}`);
  process.exit(1);
});
