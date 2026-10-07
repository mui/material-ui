import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

interface CareerJob {
  id: string;
  title: string;
  category: string;
  description: string;
  summary?: string | null;
  applicationUrl: string;
}

const defaultDocsDirectory = fileURLToPath(new URL('..', import.meta.url));

function isCareerJob(value: unknown): value is CareerJob {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const job = value as Record<string, unknown>;
  return (
    typeof job.id === 'string' &&
    /^[a-zA-Z0-9-]+$/.test(job.id) &&
    typeof job.title === 'string' &&
    job.title.trim().length > 0 &&
    typeof job.category === 'string' &&
    job.category.trim().length > 0 &&
    typeof job.description === 'string' &&
    (job.summary === undefined || job.summary === null || typeof job.summary === 'string') &&
    typeof job.applicationUrl === 'string' &&
    URL.canParse(job.applicationUrl) &&
    new URL(job.applicationUrl).protocol === 'https:'
  );
}

export default async function syncCareers(
  apiUrl = process.env.MUI_CAREERS_API_URL || 'https://frontend-public.mui.com/api/mui-careers',
  docsDirectory = defaultDocsDirectory,
) {
  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`Failed to fetch careers: ${response.status} ${response.statusText}`);
  }

  const payload: unknown = await response.json();
  if (
    !payload ||
    typeof payload !== 'object' ||
    !('data' in payload) ||
    !Array.isArray(payload.data) ||
    !payload.data.every(isCareerJob)
  ) {
    throw new Error('Invalid careers response. Expected a data array of complete job postings.');
  }
  const jobs: CareerJob[] = payload.data;
  if (new Set(jobs.map((job) => job.id)).size !== jobs.length) {
    throw new Error('Invalid careers response. Job IDs must be unique.');
  }
  jobs.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

  const dataDirectory = path.join(docsDirectory, 'data/careers');
  const roles = await format(
    JSON.stringify(
      jobs.map((job) => ({
        id: job.id,
        title: job.title,
        category: job.category,
        description: job.description,
        summary: job.summary?.trim() || '',
        applicationUrl: job.applicationUrl,
      })),
    ),
    { parser: 'json' },
  );
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(path.join(dataDirectory, 'roles.json'), roles);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  syncCareers();
}
