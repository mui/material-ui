/* eslint-disable no-console */
import { execaCommand } from 'execa';
import timers from 'timers/promises';
import { parse, HTMLElement } from 'node-html-parser';
import fs from 'fs/promises';
import chalk from 'chalk';
import { Transform } from 'node:stream';

const DEFAULT_CONCURRENCY = 4;

const prefixLines = (prefix: string) => {
  let leftover: string = '';
  return new Transform({
    transform(chunk, enc, cb) {
      const lines = (leftover + chunk.toString()).split(/\r?\n/);
      leftover = lines.pop()!;
      this.push(lines.map((l) => `${prefix + l}\n`).join(''));
      cb();
    },
    flush(cb) {
      if (leftover) {
        this.push(`${prefix + leftover}\n`);
      }
      cb();
    },
  });
};

// Maps pageUrl to ids of known targets on that page
type LinkStructure = Map<string, Set<string>>;

type SerializedLinkStructure = { targets: Record<string, string[]> };

async function fetchUrl(url: string | URL): Promise<Response> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: [${res.status}] ${res.statusText}`);
  }
  return res;
}

async function pollUrl(url: string, timeout: number): Promise<void> {
  const start = Date.now();
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await fetchUrl(url);
      return;
    } catch (error: any) {
      if (Date.now() - start > timeout) {
        throw new Error(`Timeout waiting for ${url}: ${error.message}`);
      }
      // eslint-disable-next-line no-await-in-loop
      await timers.setTimeout(1000);
    }
  }
}

function deserializeLinkStructure(data: SerializedLinkStructure): LinkStructure {
  const linkStructure: LinkStructure = new Map();
  for (const url of Object.keys(data.targets)) {
    linkStructure.set(url, new Set(data.targets[url]));
  }
  return linkStructure;
}

async function writePagesToFile(pages: Map<string, PageData>, outPath: string) {
  const fileContent: SerializedLinkStructure = { targets: {} };
  for (const [url, pageData] of pages.entries()) {
    fileContent.targets[url] = Array.from(pageData.targets.keys());
  }
  await fs.writeFile(outPath, JSON.stringify(fileContent, null, 2), 'utf-8');
}

// Polyfill for `node.computedName` available only in chrome v112+
function getAccessibleName(elm: HTMLElement | null, ownerDocument: HTMLElement): string {
  if (!elm) {
    return '';
  }

  // 1. aria-label
  const ariaLabel = elm.getAttribute('aria-label')?.trim();
  if (ariaLabel) {
    return ariaLabel;
  }

  // 2. aria-labelledby
  const labelledby = elm.getAttribute('aria-labelledby');
  if (labelledby) {
    const labels = [];
    for (const id of labelledby.split(/\s+/)) {
      const label = getAccessibleName(ownerDocument.getElementById(id), ownerDocument);
      if (label) {
        labels.push(label);
      }
    }
    const label = labels.join(' ').trim();
    if (label) {
      return label;
    }
  }

  // 3. <label for="id">
  if (elm.id) {
    const label = ownerDocument.querySelector(`label[for="${elm.id}"]`);
    if (label) {
      return getAccessibleName(label, ownerDocument);
    }
  }

  // 4. <img alt="">
  if (elm.tagName === 'IMG') {
    const alt = elm.getAttribute('alt')?.trim();
    if (alt) {
      return alt;
    }
  }

  // 5. Fallback: visible text
  return elm.innerText.trim();
}

class Queue<T> {
  private tasks: T[] = [];

  private pending = new Set<Promise<void>>();

  constructor(
    private worker: (task: T) => Promise<void>,
    private concurrency: number,
  ) {}

  add(task: T) {
    this.tasks.push(task);
    this.run();
  }

  private async run() {
    while (this.pending.size < this.concurrency && this.tasks.length > 0) {
      const task = this.tasks.shift()!;
      const p = this.worker(task).finally(() => {
        this.pending.delete(p);
        this.run();
      });
      this.pending.add(p);
    }
  }

  async waitAll() {
    while (this.pending.size > 0) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(this.pending);
    }
  }
}

interface Link {
  src: string | null;
  text: string | null;
  href: string;
}

interface LinkTarget {}

interface PageData {
  url: string;
  status: number;
  targets: Map<string, LinkTarget>;
}

function getPageUrl(href: string, ignoredPaths: RegExp[] = []): string | null {
  if (!href.startsWith('/')) {
    return null;
  }
  const parsed = new URL(href, 'http://localhost');
  if (ignoredPaths.some((pattern) => pattern.test(parsed.pathname))) {
    return null;
  }
  const link = parsed.pathname + parsed.search;
  return link;
}

export interface CrawlOptions {
  startCommand?: string | null;
  host: string;
  outPath?: string | null;
  ignoredPaths?: RegExp[];
  ignoredContent?: string[];
  ignoredTargets?: Set<string>;
  knownTargets?: Map<string, Set<string>>;
  knownTargetsDownloadUrl?: string[];
  concurrency?: number;
}

function resolveOptions(rawOptions: CrawlOptions): Required<CrawlOptions> {
  return {
    startCommand: rawOptions.startCommand ?? null,
    host: rawOptions.host,
    outPath: rawOptions.outPath ?? null,
    ignoredPaths: rawOptions.ignoredPaths ?? [],
    ignoredContent: rawOptions.ignoredContent ?? [],
    ignoredTargets: rawOptions.ignoredTargets ?? new Set(['__next', '__NEXT_DATA__']),
    knownTargets: rawOptions.knownTargets ?? new Map(),
    knownTargetsDownloadUrl: rawOptions.knownTargetsDownloadUrl ?? [],
    concurrency: rawOptions.concurrency ?? DEFAULT_CONCURRENCY,
  };
}

async function downloadKnownTargets(urls: string[]): Promise<LinkStructure> {
  if (urls.length === 0) {
    return new Map();
  }

  console.log(chalk.blue(`Downloading known targets from ${urls.length} URL(s)...`));

  const results = await Promise.all(
    urls.map(async (url) => {
      console.log(chalk.cyan(`  Fetching ${url}`));
      const res = await fetchUrl(url);
      const data: SerializedLinkStructure = await res.json();
      return deserializeLinkStructure(data);
    }),
  );

  // Merge all downloaded link structures
  const merged = new Map<string, Set<string>>();
  for (const linkStructure of results) {
    for (const [url, targets] of linkStructure.entries()) {
      if (!merged.has(url)) {
        merged.set(url, new Set());
      }
      for (const target of targets) {
        merged.get(url)!.add(target);
      }
    }
  }

  console.log(chalk.green(`Downloaded known targets for ${merged.size} page(s)`));
  return merged;
}

async function resolveKnownTargets(options: Required<CrawlOptions>): Promise<LinkStructure> {
  const downloaded = await downloadKnownTargets(options.knownTargetsDownloadUrl);

  // Merge downloaded with user-provided, user-provided takes priority
  const merged = new Map<string, Set<string>>(downloaded);
  for (const [url, targets] of options.knownTargets.entries()) {
    merged.set(url, targets);
  }

  return merged;
}

export interface CrawlResult {
  brokenLinks: number;
}

export async function crawl(rawOptions: CrawlOptions): Promise<CrawlResult> {
  const options = resolveOptions(rawOptions);
  const knownTargets = await resolveKnownTargets(options);
  const startTime = Date.now();

  let appProcess;
  if (options.startCommand) {
    console.log(chalk.blue(`Starting server with "${options.startCommand}"...`));
    appProcess = execaCommand(options.startCommand, {
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        FORCE_COLOR: '1',
        ...process.env,
      },
    });

    // Prefix server logs
    const serverPrefix = chalk.gray('server: ');
    appProcess.stdout?.pipe(prefixLines(serverPrefix)).pipe(process.stdout);
    appProcess.stderr?.pipe(prefixLines(serverPrefix)).pipe(process.stderr);

    await pollUrl(options.host, 10000);

    console.log(`Server started on ${chalk.underline(options.host)}`);
  }

  const crawledPages = new Map<string, Promise<PageData>>();
  const crawledLinks = new Set<Link>();

  const queue = new Queue<Link>(async (link) => {
    crawledLinks.add(link);

    const pageUrl = getPageUrl(link.href, options.ignoredPaths);
    if (pageUrl === null) {
      return;
    }

    if (knownTargets.has(pageUrl)) {
      return;
    }

    if (crawledPages.has(pageUrl)) {
      return;
    }

    const pagePromise = Promise.resolve().then(async () => {
      console.log(`Crawling ${chalk.cyan(pageUrl)}...`);
      const res = await fetch(new URL(pageUrl, options.host));

      const urlData = { url: pageUrl, status: res.status };

      if (urlData.status < 200 || urlData.status >= 400) {
        console.warn(chalk.yellow(`Warning: ${pageUrl} returned status ${urlData.status}`));

        return {
          url: pageUrl,
          status: res.status,
          targets: new Map(),
          links: [],
        };
      }

      const html = await res.text();

      const dom = parse(html);

      for (const selector of options.ignoredContent) {
        dom.querySelectorAll(selector).forEach((el) => {
          el.remove();
        });
      }

      const pageLinks: Link[] = dom.querySelectorAll('a[href]').map((a) => ({
        src: pageUrl,
        text: getAccessibleName(a, dom),
        href: a.attributes.href,
      }));

      const pageTargets = new Map(
        dom
          .querySelectorAll('*[id]')
          .filter((el) => !options.ignoredTargets.has(el.attributes.id))
          .map((el) => [`#${el.attributes.id}`, {}]),
      );

      const pageData: PageData = {
        url: pageUrl,
        status: res.status,
        targets: pageTargets,
      };

      for (const pageLink of pageLinks) {
        queue.add(pageLink);
      }

      return pageData;
    });

    crawledPages.set(pageUrl, pagePromise);

    await pagePromise;
  }, options.concurrency);

  queue.add({ src: null, text: null, href: '/' });

  await queue.waitAll();

  if (appProcess) {
    await appProcess.kill();
  }

  const results = new Map(
    await Promise.all(Array.from(crawledPages.entries(), async ([a, b]) => [a, await b] as const)),
  );

  if (options.outPath) {
    await writePagesToFile(results, options.outPath);
  }

  interface BrokenLinkError {
    link: Link;
    reason: string;
  }

  const brokenLinksByPage = new Map<string, BrokenLinkError[]>();

  function recordBrokenLink(link: Link, reason: string): void {
    const src = link.src ?? '(unknown)';
    const linksForPage = brokenLinksByPage.get(src) ?? [];
    brokenLinksByPage.set(src, linksForPage);
    linksForPage.push({ link, reason });
  }

  let totalLinks = 0;
  let checkedLinks = 0;
  let brokenLinks = 0;
  let brokenLinkTargets = 0;
  for (const crawledLink of crawledLinks) {
    totalLinks += 1;
    const pageUrl = getPageUrl(crawledLink.href, options.ignoredPaths);
    if (pageUrl === null) {
      // External link
      continue;
    }
    checkedLinks += 1;

    const parsed = new URL(crawledLink.href, 'http://localhost');

    const knownPage = knownTargets.get(pageUrl);
    if (knownPage) {
      if (parsed.hash && !knownPage.has(parsed.hash)) {
        recordBrokenLink(crawledLink, 'target not found');
        brokenLinkTargets += 1;
      }
      continue;
    }

    const page = results.get(pageUrl);

    if (!page) {
      recordBrokenLink(crawledLink, 'not crawled');
      brokenLinks += 1;
      continue;
    }
    if (page.status >= 400) {
      recordBrokenLink(crawledLink, `returned status ${page.status}`);
      brokenLinks += 1;
      continue;
    }
    if (parsed.hash) {
      if (!page.targets.has(parsed.hash)) {
        recordBrokenLink(crawledLink, 'target not found');
        brokenLinkTargets += 1;
      }
    }
  }

  // Report broken links grouped by source page
  if (brokenLinksByPage.size > 0) {
    console.error('\nBroken links found:\n');
    for (const [pageUrl, errors] of brokenLinksByPage.entries()) {
      console.error(`Source ${chalk.cyan(pageUrl)}:`);
      for (const { link, reason } of errors) {
        console.error(`  [${link.text}](${chalk.cyan(link.href)}) (${reason})`);
      }
    }
  }

  const endTime = Date.now();
  const durationSeconds = (endTime - startTime) / 1000;
  const duration = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'second',
    maximumFractionDigits: 2,
  }).format(durationSeconds);
  console.log(chalk.blue(`\nCrawl completed in ${duration}`));
  console.log(`  Total links found: ${chalk.cyan(totalLinks)}`);
  console.log(`  Total links checked: ${chalk.cyan(checkedLinks)}`);
  console.log(`  Total broken links: ${chalk.cyan(brokenLinks)}`);
  console.log(`  Total broken link targets: ${chalk.cyan(brokenLinkTargets)}`);

  const totalBrokenLinks = brokenLinks + brokenLinkTargets;
  return { brokenLinks: totalBrokenLinks };
}
