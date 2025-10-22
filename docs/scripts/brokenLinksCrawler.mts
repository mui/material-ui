/* eslint-disable no-console */
import { execaCommand } from 'execa';
import timers from 'timers/promises';
import { parse, HTMLElement } from 'node-html-parser';
import fs from 'fs/promises';

const DEFAULT_CONCURRENCY = 4;

// Maps pageUrl to ids of known targets on that page
type LinkStructure = Map<string, Set<string>>;

type SerializedLinkStructure = { targets: Record<string, string[]> };

async function pollUrl(url: string, timeout: number): Promise<void> {
  const start = Date.now();
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: [${res.status}] ${res.statusText}`);
      }
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
  concurrency?: number;
}

function resolveOptions(options: CrawlOptions): Required<CrawlOptions> {
  return {
    startCommand: options.startCommand ?? null,
    host: options.host,
    outPath: options.outPath ?? null,
    ignoredPaths: options.ignoredPaths ?? [],
    ignoredContent: options.ignoredContent ?? [],
    ignoredTargets: options.ignoredTargets ?? new Set(),
    knownTargets: options.knownTargets ?? new Map(),
    concurrency: options.concurrency ?? DEFAULT_CONCURRENCY,
  };
}

export async function crawl(options: CrawlOptions): Promise<void> {
  const resolved = resolveOptions(options);
  const startTime = Date.now();

  let appProcess;
  if (resolved.startCommand) {
    console.log(`Starting server with "${resolved.startCommand}"...`);
    appProcess = execaCommand(resolved.startCommand, {
      stdio: 'inherit',
    });
    await pollUrl(resolved.host, 10000);
  }

  console.log(`Server started on port ${resolved.host}`);

  const crawledPages = new Map<string, Promise<PageData>>();
  const crawledLinks = new Set<Link>();

  const queue = new Queue<Link>(async (link) => {
    crawledLinks.add(link);

    const pageUrl = getPageUrl(link.href, resolved.ignoredPaths);
    if (pageUrl === null) {
      return;
    }

    if (resolved.knownTargets.has(pageUrl)) {
      return;
    }

    if (crawledPages.has(pageUrl)) {
      return;
    }

    const pagePromise = Promise.resolve().then(async () => {
      console.log(`Crawling ${pageUrl}`);
      const res = await fetch(new URL(pageUrl, resolved.host));

      const urlData = { url: pageUrl, status: res.status };

      if (urlData.status < 200 || urlData.status >= 400) {
        console.warn(`Warning: ${pageUrl} returned status ${urlData.status}`);

        return {
          url: pageUrl,
          status: res.status,
          targets: new Map(),
          links: [],
        };
      }

      const html = await res.text();

      const dom = parse(html);

      for (const selector of resolved.ignoredContent) {
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
          .filter((el) => !resolved.ignoredTargets.has(el.attributes.id))
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
  }, resolved.concurrency);

  queue.add({ src: null, text: null, href: '/' });

  await queue.waitAll();

  if (appProcess) {
    await appProcess.kill();
  }

  const results = new Map(
    await Promise.all(Array.from(crawledPages.entries(), async ([a, b]) => [a, await b] as const)),
  );

  if (resolved.outPath) {
    await writePagesToFile(results, resolved.outPath);
  }

  console.log('Crawl results:');

  let totalLinks = 0;
  let checkedLinks = 0;
  let brokenLinks = 0;
  let brokenLinkTargets = 0;
  for (const crawledLink of crawledLinks) {
    totalLinks += 1;
    const pageUrl = getPageUrl(crawledLink.href, resolved.ignoredPaths);
    if (pageUrl === null) {
      // External link
      continue;
    }
    checkedLinks += 1;

    const parsed = new URL(crawledLink.href, 'http://localhost');

    const knownPage = resolved.knownTargets.get(pageUrl);
    if (knownPage) {
      if (parsed.hash && !knownPage.has(parsed.hash)) {
        console.error(
          `Broken link: ${crawledLink.src}["${crawledLink.text}"] -> ${crawledLink.href} (target not found)`,
        );
        brokenLinkTargets += 1;
      }
      continue;
    }

    const page = results.get(pageUrl);

    if (!page) {
      console.error(
        `Broken link: ${crawledLink.src}["${crawledLink.text}"] -> ${crawledLink.href} (not crawled)`,
      );
      brokenLinks += 1;
      continue;
    }
    if (page.status >= 400) {
      console.error(
        `Broken link: ${crawledLink.src}["${crawledLink.text}"] -> ${crawledLink.href} (returned status ${page.status})`,
      );
      brokenLinks += 1;
      continue;
    }
    if (parsed.hash) {
      if (!page.targets.has(parsed.hash)) {
        console.error(
          `Broken link: ${crawledLink.src}["${crawledLink.text}"] -> ${crawledLink.href} (target not found)`,
        );
        brokenLinkTargets += 1;
      }
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  console.log(`Crawl completed in ${duration} seconds`);
  console.log(`Total links found: ${totalLinks}`);
  console.log(`Total links checked: ${checkedLinks}`);
  console.log(`Total broken links: ${brokenLinks}`);
  console.log(`Total broken link targets: ${brokenLinkTargets}`);

  if (brokenLinks > 0 || brokenLinkTargets > 0) {
    process.exit(1);
  }
}
