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

export default async function syncCareers(
  apiUrl = process.env.MUI_CAREERS_API_URL || 'https://frontend-public.mui.com/api/mui-careers',
  docsDirectory = defaultDocsDirectory,
) {
  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`Failed to fetch careers: ${response.status} ${response.statusText}`);
  }

  const { data: jobs }: { data: CareerJob[] } = await response.json();
  jobs.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

  const roles = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    summary: job.summary?.trim() || '',
    applicationUrl: job.applicationUrl,
    url: `/careers/roles/${job.id}/`,
  }));
  const rolesByCategory = new Map<string, typeof roles>();
  jobs.forEach((job, index) => {
    const category = rolesByCategory.get(job.category) ?? [];
    category.push(roles[index]);
    rolesByCategory.set(job.category, category);
  });

  const dataDirectory = path.join(docsDirectory, 'data/careers');
  const content = await format(
    JSON.stringify({
      count: roles.length,
      categories: Array.from(rolesByCategory, ([title, categoryRoles]) => ({
        title,
        roles: categoryRoles,
      })),
    }),
    { parser: 'json' },
  );
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(path.join(dataDirectory, 'roles.json'), content);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  syncCareers();
}
