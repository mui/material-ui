/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { execaCommand } from 'execa';
import timers from 'timers/promises';
import { parse } from 'node-html-parser';
import fs from 'fs/promises';
import chalk from 'chalk';
import { Transform } from 'node:stream';

const DEFAULT_CONCURRENCY = 4;

/**
 * @param {string} prefix
 * @returns {Transform}
 */
const prefixLines = (prefix) => {
  let leftover = '';
  return new Transform({
    transform(chunk, enc, cb) {
      const lines = (leftover + chunk.toString()).split(/\r?\n/);
      leftover = lines.pop();
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

/**
 * Maps pageUrl to ids of known targets on that page
 * @typedef {Map<string, Set<string>>} LinkStructure
 */

/**
 * @typedef {Object} SerializedLinkStructure
 * @property {Record<string, string[]>} targets
 */

/**
 * @param {string | URL} url
 * @returns {Promise<Response>}
 */
async function fetchUrl(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: [${res.status}] ${res.statusText}`);
  }
  return res;
}

/**
 * @param {string} url
 * @param {number} timeout
 * @returns {Promise<void>}
 */
async function pollUrl(url, timeout) {
  const start = Date.now();
  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await fetchUrl(url);
      return;
    } catch (error) {
      if (Date.now() - start > timeout) {
        throw new Error(`Timeout waiting for ${url}: ${error.message}`);
      }
      // eslint-disable-next-line no-await-in-loop
      await timers.setTimeout(1000);
    }
  }
}

/**
 * @param {SerializedLinkStructure} data
 * @returns {LinkStructure}
 */
function deserializeLinkStructure(data) {
  const linkStructure = new Map();
  for (const url of Object.keys(data.targets)) {
    linkStructure.set(url, new Set(data.targets[url]));
  }
  return linkStructure;
}

/**
 * @typedef {Object} LinkTarget
 */

/**
 * @typedef {Object} PageData
 * @property {string} url
 * @property {number} status
 * @property {Map<string, LinkTarget>} targets
 */

/**
 * @param {Map<string, PageData>} pages
 * @param {string} outPath
 * @returns {Promise<void>}
 */
async function writePagesToFile(pages, outPath) {
  const fileContent = { targets: {} };
  for (const [url, pageData] of pages.entries()) {
    fileContent.targets[url] = Array.from(pageData.targets.keys());
  }
  await fs.writeFile(outPath, JSON.stringify(fileContent, null, 2), 'utf-8');
}

/**
 * Polyfill for `node.computedName` available only in chrome v112+
 * @param {import('node-html-parser').HTMLElement | null} elm
 * @param {import('node-html-parser').HTMLElement} ownerDocument
 * @returns {string}
 */
function getAccessibleName(elm, ownerDocument) {
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

/**
 * @template T
 */
class Queue {
  /** @type {T[]} */
  tasks = [];

  /** @type {Set<Promise<void>>} */
  pending = new Set();

  /**
   * @param {(task: T) => Promise<void>} worker
   * @param {number} concurrency
   */
  constructor(worker, concurrency) {
    this.worker = worker;
    this.concurrency = concurrency;
  }

  /**
   * @param {T} task
   */
  add(task) {
    this.tasks.push(task);
    this.run();
  }

  async run() {
    while (this.pending.size < this.concurrency && this.tasks.length > 0) {
      const task = this.tasks.shift();
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

/**
 * @typedef {Object} Link
 * @property {string | null} src
 * @property {string | null} text
 * @property {string} href
 */

/**
 * @param {string} href
 * @param {RegExp[]} ignoredPaths
 * @returns {string | null}
 */
function getPageUrl(href, ignoredPaths = []) {
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

/**
 * @typedef {Object} CrawlOptions
 * @property {string | null} [startCommand]
 * @property {string} host
 * @property {string | null} [outPath]
 * @property {RegExp[]} [ignoredPaths]
 * @property {string[]} [ignoredContent]
 * @property {Set<string>} [ignoredTargets]
 * @property {Map<string, Set<string>>} [knownTargets]
 * @property {string[]} [knownTargetsDownloadUrl]
 * @property {number} [concurrency]
 */

/**
 * @typedef {Required<CrawlOptions>} ResolvedCrawlOptions
 */

/**
 * @param {CrawlOptions} rawOptions
 * @returns {ResolvedCrawlOptions}
 */
function resolveOptions(rawOptions) {
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

/**
 * @param {string[]} urls
 * @returns {Promise<LinkStructure>}
 */
async function downloadKnownTargets(urls) {
  if (urls.length === 0) {
    return new Map();
  }

  console.log(chalk.blue(`Downloading known targets from ${urls.length} URL(s)...`));

  const results = await Promise.all(
    urls.map(async (url) => {
      console.log(`  Fetching ${chalk.underline(url)}`);
      const res = await fetchUrl(url);
      const data = await res.json();
      return deserializeLinkStructure(data);
    }),
  );

  // Merge all downloaded link structures
  const merged = new Map();
  for (const linkStructure of results) {
    for (const [url, targets] of linkStructure.entries()) {
      if (!merged.has(url)) {
        merged.set(url, new Set());
      }
      for (const target of targets) {
        merged.get(url).add(target);
      }
    }
  }

  console.log(chalk.green(`Downloaded known targets for ${merged.size} page(s)`));
  return merged;
}

/**
 * @param {ResolvedCrawlOptions} options
 * @returns {Promise<LinkStructure>}
 */
async function resolveKnownTargets(options) {
  const downloaded = await downloadKnownTargets(options.knownTargetsDownloadUrl);

  // Merge downloaded with user-provided, user-provided takes priority
  const merged = new Map(downloaded);
  for (const [url, targets] of options.knownTargets.entries()) {
    merged.set(url, targets);
  }

  return merged;
}

/**
 * @typedef {Object} CrawlResult
 * @property {number} brokenLinks
 */

/**
 * @param {CrawlOptions} rawOptions
 * @returns {Promise<CrawlResult>}
 */
export async function crawl(rawOptions) {
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

  const crawledPages = new Map();
  const crawledLinks = new Set();

  const queue = new Queue(async (link) => {
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

      const pageLinks = dom.querySelectorAll('a[href]').map((a) => ({
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

      const pageData = {
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
    await Promise.all(Array.from(crawledPages.entries(), async ([a, b]) => [a, await b])),
  );

  if (options.outPath) {
    await writePagesToFile(results, options.outPath);
  }

  /**
   * @typedef {Object} BrokenLinkError
   * @property {Link} link
   * @property {string} reason
   */

  /** @type {Map<string, BrokenLinkError[]>} */
  const brokenLinksByPage = new Map();

  /**
   * @param {Link} link
   * @param {string} reason
   */
  function recordBrokenLink(link, reason) {
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
