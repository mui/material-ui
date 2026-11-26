import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mapAsync } from 'es-toolkit/array';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { toString as hastToString } from 'hast-util-to-string';
import { toString as mdastToString } from 'mdast-util-to-string';

const ASHBY_API_URL = 'https://api.ashbyhq.com/posting-api/job-board/MUI';
const ASHBY_UTM_SOURCE = 'ZNRrPGBkqO';
// General application linked separately in the "Next roles" section of careers.tsx.
const DREAM_JOB_ASHBY_ID = '4715d81f-d00f-42d4-a0d0-221f40f73e19';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STRIP_IF_EMPTY_TAGS = new Set([
  'p',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'blockquote',
]);

export interface Role {
  title: string;
  description: string;
  url: string;
}

export interface RoleCategory {
  title: string;
  roles: Role[];
}

export type OpenRolesData = RoleCategory[];

export interface ActiveOpenRole extends Role {
  category: string;
  slug: string | null;
}

export interface AshbyJob {
  id: string;
  title: string;
  department?: string | null;
  team?: string | null;
  location?: string | null;
  isRemote?: boolean;
  employmentType?: string | null;
  publishedAt?: string | null;
  isListed?: boolean;
  jobUrl?: string | null;
  descriptionHtml?: string | null;
}

export interface ExistingRoleFile {
  slug: string;
  content: string;
}

export interface CollectCareersDataInput {
  jobs: AshbyJob[];
  openRolesData: OpenRolesData;
  entries: string[];
  existingRoleFiles: ExistingRoleFile[];
  now?: number;
}

export interface ExistingRole {
  slug: string;
  title: string | null;
  description: string | null;
  ashbyId: string | null;
  rawMarkdown: string;
  hasJsPage: boolean;
  activeInOpenRoles: boolean;
}

export interface JobMatch<
  TJob extends Pick<AshbyJob, 'id' | 'title'> = AshbyJob,
  TRole extends Pick<ExistingRole, 'ashbyId' | 'title' | 'slug'> = ExistingRole,
> {
  job: TJob;
  existing: TRole | null;
  matchType: 'ashbyId' | 'title' | null;
  suggestedSlug: string;
}

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: { className?: string[] };
  children?: HastNode[];
}

interface MdastNode {
  type: string;
  depth?: number;
  ordered?: boolean;
  spread?: boolean;
  url?: string;
  value?: string;
  children?: MdastNode[];
}

function getCareersPaths() {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  return {
    careersDirectory: path.resolve(currentDirectory, '../pages/careers'),
    openRolesPath: path.resolve(currentDirectory, '../data/careers/openRoles.json'),
  };
}

function applyMuiNonBreakingSpaces(text: string): string {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/\bMaterial UI\b/g, 'Material\u00A0UI')
    .replace(/\bMUI X\b/g, 'MUI\u00A0X')
    .replace(/\bBase UI\b/g, 'Base\u00A0UI')
    .replace(/\bJoy UI\b/g, 'Joy\u00A0UI');
}

/**
 * Rehype plugin that removes empty spacer blocks (`<p></p>`, `<div>&nbsp;</div>`, empty headings)
 * emitted by Ashby's ProseMirror/Tiptap editor, strips leading/trailing `<hr>` dividers, and
 * unwraps `<u>` tags (used around link labels).
 */
function rehypeCleanAshbyHtml() {
  function transformChildren(children: HastNode[]): HastNode[] {
    const cleaned: HastNode[] = [];
    for (const child of children) {
      if (child.type === 'element') {
        if (child.tagName === 'u') {
          cleaned.push(...transformChildren(child.children ?? []));
          continue;
        }
        child.children = transformChildren(child.children ?? []);
        if (
          child.tagName &&
          STRIP_IF_EMPTY_TAGS.has(child.tagName) &&
          hastToString(child as never)
            .replace(/\u00A0/g, ' ')
            .trim() === '' &&
          !child.children.some((nested) => nested.type === 'element' && nested.tagName === 'img')
        ) {
          continue;
        }
      }
      cleaned.push(child);
    }
    return cleaned;
  }

  function isWhitespaceText(node: HastNode): boolean {
    return (
      node.type === 'text' &&
      typeof node.value === 'string' &&
      node.value.replace(/\u00A0/g, ' ').trim() === ''
    );
  }

  return (tree: HastNode) => {
    const children = transformChildren(tree.children ?? []);
    while (
      children.length > 0 &&
      (isWhitespaceText(children[0]) ||
        (children[0].type === 'element' && children[0].tagName === 'hr'))
    ) {
      children.shift();
    }
    while (
      children.length > 0 &&
      (isWhitespaceText(children[children.length - 1]) ||
        (children[children.length - 1].type === 'element' &&
          children[children.length - 1].tagName === 'hr'))
    ) {
      children.pop();
    }
    tree.children = children;
  };
}

/**
 * Remark plugin that normalizes non-breaking spaces in text nodes (applying MUI brand NBSPs),
 * tightens list items (spread: false), and inserts the `## How to apply` section.
 */
function remarkNormalizeAshbyJob({ applyUrl }: { applyUrl?: string } = {}) {
  function visitMdast(node: MdastNode) {
    if (node.type === 'text' && typeof node.value === 'string') {
      node.value = applyMuiNonBreakingSpaces(node.value);
    }
    if (node.type === 'list' || node.type === 'listItem') {
      node.spread = false;
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visitMdast(child);
      }
    }
  }

  return (tree: MdastNode) => {
    visitMdast(tree);

    if (!applyUrl || !Array.isArray(tree.children)) {
      return;
    }

    const hasHowToApply = tree.children.some(
      (node) =>
        node.type === 'heading' &&
        mdastToString(node as never)
          .trim()
          .toLowerCase() === 'how to apply',
    );
    if (hasHowToApply) {
      return;
    }

    const howToApplyNodes: MdastNode[] = [
      {
        type: 'heading',
        depth: 2,
        children: [{ type: 'text', value: 'How to apply' }],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: applyUrl,
            children: [{ type: 'text', value: 'Apply now for this position 📮' }],
          },
        ],
      },
    ];

    const insertIndex = tree.children.findIndex(
      (node) =>
        node.type === 'paragraph' &&
        mdastToString(node as never)
          .trim()
          .startsWith("Don't meet every requirement?"),
    );

    if (insertIndex !== -1) {
      tree.children.splice(insertIndex, 0, ...howToApplyNodes);
    } else {
      tree.children.push(...howToApplyNodes);
    }
  };
}

export function normalizeTitle(title: string | null | undefined): string {
  return String(title ?? '')
    .toLowerCase()
    .replace(/[\u2013\u2014]+/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function slugifyTitle(title: string | null | undefined): string {
  return String(title ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Converts Ashby's job `descriptionHtml` into clean Markdown using unified/rehype/remark.
 */
export function htmlToMarkdown(
  html: string | null | undefined,
  { applyUrl }: { applyUrl?: string } = {},
): string {
  const file = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeCleanAshbyHtml as never)
    .use(rehypeRemark)
    .use(remarkNormalizeAshbyJob as never, { applyUrl })
    .use(remarkStringify, {
      bullet: '-',
      emphasis: '*',
      fences: true,
      listItemIndent: 'one',
      rule: '-',
      strong: '*',
    })
    .processSync(html ?? '');

  return String(file).trim();
}

/**
 * Builds a complete career role Markdown document from Ashby `descriptionHtml`.
 */
export function buildRoleMarkdown({
  title,
  description,
  descriptionHtml,
  applyUrl,
}: {
  title: string;
  description?: string | null;
  descriptionHtml?: string | null;
  applyUrl?: string;
}): string {
  const parts = [`# ${title}`];
  if (description) {
    parts.push(`<p class="description">${description}</p>`);
  }
  const body = htmlToMarkdown(descriptionHtml, { applyUrl });
  if (body) {
    parts.push(body);
  }
  return `${parts.join('\n\n')}\n`;
}

function normalizeUrlForComparison(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.pathname === '/') {
      return `${parsed.origin}${parsed.search}${parsed.hash}`;
    }
    return parsed.href;
  } catch {
    return rawUrl;
  }
}

function canonicalizeMdast(node: MdastNode): MdastNode | null {
  if (node.type === 'html') {
    return null;
  }
  if (node.type === 'text') {
    const value = (node.value ?? '').replace(/[\u00A0\s]+/g, ' ');
    return { type: 'text', value };
  }
  const canonical: MdastNode = { type: node.type };
  if (node.depth !== undefined) {
    canonical.depth = node.depth;
  }
  if (node.ordered !== undefined) {
    canonical.ordered = node.ordered;
  }
  if (node.url !== undefined) {
    canonical.url = normalizeUrlForComparison(node.url);
  }
  if (node.value !== undefined) {
    canonical.value = node.value;
  }
  if (Array.isArray(node.children)) {
    const children: MdastNode[] = [];
    for (const child of node.children) {
      const normalized = canonicalizeMdast(child);
      if (!normalized) {
        continue;
      }
      const prev = children[children.length - 1];
      if (normalized.type === 'text' && prev?.type === 'text') {
        prev.value = `${prev.value ?? ''}${normalized.value ?? ''}`.replace(/\s+/g, ' ');
      } else {
        children.push(normalized);
      }
    }
    if (children.length > 0 && children[0].type === 'text') {
      children[0].value = (children[0].value ?? '').trimStart();
    }
    if (children.length > 0 && children[children.length - 1].type === 'text') {
      children[children.length - 1].value = (children[children.length - 1].value ?? '').trimEnd();
    }
    canonical.children = children;
  }
  return canonical;
}

/**
 * Compares existing and generated role Markdown semantically (ignoring soft line-breaks,
 * `<p class="description">`, HTML comments, and root trailing slashes on URLs).
 */
export function hasMeaningfulMarkdownChanges(
  existingMarkdown: string | null | undefined,
  generatedMarkdown: string | null | undefined,
): boolean {
  const parser = unified().use(remarkParse);
  const existingAst = canonicalizeMdast(parser.parse(existingMarkdown ?? '') as MdastNode);
  const generatedAst = canonicalizeMdast(parser.parse(generatedMarkdown ?? '') as MdastNode);
  return JSON.stringify(existingAst) !== JSON.stringify(generatedAst);
}

/**
 * Flattens `docs/data/careers/openRoles.json` into category names and active role entries.
 */
export function extractActiveOpenRoles(openRolesData: OpenRolesData): {
  categories: string[];
  activeOpenRoles: ActiveOpenRole[];
} {
  const categories: string[] = [];
  const activeOpenRoles: ActiveOpenRole[] = [];

  for (const category of openRolesData) {
    categories.push(category.title);
    for (const role of category.roles ?? []) {
      const segments = String(role.url ?? '')
        .split('/')
        .filter(Boolean);
      const slug = segments[0] === 'careers' && segments[1] ? segments[1] : null;
      activeOpenRoles.push({
        category: category.title,
        title: role.title,
        description: role.description ?? '',
        url: role.url,
        slug,
      });
    }
  }

  return { categories, activeOpenRoles };
}

function extractAshbyIdFromUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.hostname !== 'jobs.ashbyhq.com') {
      return null;
    }
    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments[0]?.toLowerCase() === 'mui' && segments[1] && UUID_PATTERN.test(segments[1])) {
      return segments[1].toLowerCase();
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Parses an existing `docs/pages/careers/<slug>.md` file with remark + rehype to extract its
 * title, `<p class="description">` text, and Ashby job UUID.
 */
export function parseRoleMarkdown(markdown: string): {
  title: string | null;
  description: string | null;
  ashbyId: string | null;
} {
  const mdast = unified().use(remarkParse).parse(markdown) as MdastNode;
  let title: string | null = null;
  let description: string | null = null;
  let ashbyId: string | null = null;

  function visit(node: MdastNode) {
    if (node.type === 'heading' && node.depth === 1 && title === null) {
      title = mdastToString(node as never).trim();
    } else if (node.type === 'html' && description === null && node.value) {
      const hast = unified().use(rehypeParse, { fragment: true }).parse(node.value) as HastNode;
      for (const child of hast.children ?? []) {
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          Array.isArray(child.properties?.className) &&
          child.properties.className.includes('description')
        ) {
          description = hastToString(child as never).trim();
          break;
        }
      }
    } else if (node.type === 'link' && ashbyId === null && node.url) {
      const id = extractAshbyIdFromUrl(node.url);
      if (id) {
        ashbyId = id;
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  }

  visit(mdast);
  return { title, description, ashbyId };
}

function parseExistingRoles(
  existingRoleFiles: ExistingRoleFile[],
  activeOpenSlugs: Set<string>,
  entries: string[],
): ExistingRole[] {
  const jsFiles = new Set(entries.filter((file) => file.endsWith('.js')));

  return [...existingRoleFiles]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map(({ slug, content }) => {
      const { title, description, ashbyId } = parseRoleMarkdown(content);

      return {
        slug,
        title,
        description,
        ashbyId,
        rawMarkdown: content,
        hasJsPage: jsFiles.has(`${slug}.js`),
        activeInOpenRoles: activeOpenSlugs.has(slug),
      };
    });
}

export function isActiveAshbyJob(
  job: Pick<AshbyJob, 'id' | 'isListed' | 'publishedAt'> | null | undefined,
  now = Date.now(),
): boolean {
  if (!job || job.isListed !== true) {
    return false;
  }
  if (!job.id || String(job.id).toLowerCase() === DREAM_JOB_ASHBY_ID) {
    return false;
  }
  if (!job.publishedAt) {
    return false;
  }
  const publishedMs = Date.parse(job.publishedAt);
  if (Number.isNaN(publishedMs) || publishedMs > now) {
    return false;
  }
  return true;
}

export function matchJobs<
  TJob extends Pick<AshbyJob, 'id' | 'title'>,
  TRole extends Pick<ExistingRole, 'ashbyId' | 'title' | 'slug'>,
>(jobs: TJob[], roles: TRole[], entries: string[]): JobMatch<TJob, TRole>[] {
  const activeIds = new Set(jobs.map((job) => job.id.toLowerCase()));
  const rolesById = new Map(
    roles
      .filter((role): role is TRole & { ashbyId: string } => Boolean(role.ashbyId))
      .map((role) => [role.ashbyId, role]),
  );
  const unmatchedJobs = jobs.filter((job) => !rolesById.has(job.id.toLowerCase()));
  const unmatchedRoles = roles.filter((role) => !role.ashbyId || !activeIds.has(role.ashbyId));
  const reserved = new Set(entries.map((entry) => path.parse(entry).name.toLowerCase()));

  return [...jobs]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((job) => {
      const byId = rolesById.get(job.id.toLowerCase());
      if (byId) {
        return { job, existing: byId, matchType: 'ashbyId', suggestedSlug: byId.slug };
      }

      const title = normalizeTitle(job.title);
      const sameTitle = (item: { title: string | null }) => normalizeTitle(item.title) === title;
      const candidates = unmatchedRoles.filter(sameTitle);
      if (title && candidates.length === 1 && unmatchedJobs.filter(sameTitle).length === 1) {
        const [existing] = candidates;
        return { job, existing, matchType: 'title', suggestedSlug: existing.slug };
      }

      const base = slugifyTitle(job.title) || 'role';
      let suggestedSlug = base;
      for (let suffix = 2; reserved.has(suggestedSlug); suffix += 1) {
        suggestedSlug = `${base}-${suffix}`;
      }
      reserved.add(suggestedSlug);
      return { job, existing: null, matchType: null, suggestedSlug };
    });
}

export function collectCareersData({
  jobs,
  openRolesData,
  entries,
  existingRoleFiles,
  now = Date.now(),
}: CollectCareersDataInput) {
  const { categories, activeOpenRoles } = extractActiveOpenRoles(openRolesData);

  const activeOpenSlugs = new Set(
    activeOpenRoles.map((role) => role.slug).filter((slug): slug is string => Boolean(slug)),
  );
  const existingRolesFull = parseExistingRoles(existingRoleFiles, activeOpenSlugs, entries);
  const listedJobs = jobs.filter((job) => isActiveAshbyJob(job, now));
  const matches = matchJobs(listedJobs, existingRolesFull, entries);
  const activeMatchedSlugs = new Set<string>();

  const activeJobs = matches.map(({ job, existing, matchType, suggestedSlug }) => {
    const applyUrl = `https://jobs.ashbyhq.com/MUI/${job.id}/application?utm_source=${ASHBY_UTM_SOURCE}`;

    if (existing) {
      activeMatchedSlugs.add(existing.slug);
    }

    const markdown = buildRoleMarkdown({
      title: job.title,
      description: existing?.description ?? null,
      descriptionHtml: job.descriptionHtml,
      applyUrl,
    });
    const contentChanged = existing
      ? hasMeaningfulMarkdownChanges(existing.rawMarkdown, markdown)
      : true;
    const existingHasJsPage = existing?.hasJsPage ?? false;
    const isCurrentlyActiveInOpenRoles = existing ? activeOpenSlugs.has(existing.slug) : false;

    return {
      id: job.id,
      title: job.title,
      department: job.department ?? null,
      team: job.team ?? null,
      location: job.location ?? null,
      isRemote: Boolean(job.isRemote),
      employmentType: job.employmentType ?? null,
      publishedAt: job.publishedAt ?? null,
      jobUrl: job.jobUrl ?? `https://jobs.ashbyhq.com/MUI/${job.id}`,
      applyUrl,
      existingSlug: existing?.slug ?? null,
      matchType,
      suggestedSlug,
      existingTitle: existing?.title ?? null,
      existingDescription: existing?.description ?? null,
      existingHasJsPage,
      isCurrentlyActiveInOpenRoles,
      contentChanged,
      markdown,
    };
  });

  const rolesToDeactivate = activeOpenRoles.filter(
    (role) => !role.slug || !activeMatchedSlugs.has(role.slug),
  );

  const existingRoles = existingRolesFull.map(({ rawMarkdown, ...rest }) => rest);

  return {
    fetchedAt: new Date(now).toISOString(),
    categories,
    activeJobs,
    rolesToDeactivate,
    existingRoles,
    summary: {
      activeJobsCount: activeJobs.length,
      matchedByIdCount: activeJobs.filter((job) => job.matchType === 'ashbyId').length,
      matchedByTitleCount: activeJobs.filter((job) => job.matchType === 'title').length,
      newJobsCount: activeJobs.filter((job) => job.existingSlug === null).length,
      contentChangedCount: activeJobs.filter((job) => job.contentChanged).length,
      rolesToDeactivateCount: rolesToDeactivate.length,
    },
  };
}

async function main() {
  const response = await fetch(ASHBY_API_URL, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`Ashby API request failed: HTTP ${response.status} ${await response.text()}`);
  }
  const payload = (await response.json()) as { jobs?: AshbyJob[] };
  if (!Array.isArray(payload.jobs)) {
    throw new Error('Ashby API response is missing a jobs array');
  }

  const { careersDirectory, openRolesPath } = getCareersPaths();
  const [openRolesRaw, entries] = await Promise.all([
    fs.readFile(openRolesPath, 'utf8'),
    fs.readdir(careersDirectory),
  ]);
  const openRolesData: OpenRolesData = JSON.parse(openRolesRaw);
  const mdFiles = entries
    .filter((file) => file.endsWith('.md') && file !== 'ROLE_TEMPLATE.md')
    .sort();
  const existingRoleFiles: ExistingRoleFile[] = await mapAsync(
    mdFiles,
    async (file) => ({
      slug: file.slice(0, -3),
      content: await fs.readFile(path.join(careersDirectory, file), 'utf8'),
    }),
    { concurrency: 5 },
  );

  const data = collectCareersData({
    jobs: payload.jobs,
    openRolesData,
    entries,
    existingRoleFiles,
  });
  process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
}

if (
  typeof process !== 'undefined' &&
  process.argv?.[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
