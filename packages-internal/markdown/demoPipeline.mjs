// @ts-check

/**
 * Pages and demos that render through docs-infra instead of the legacy pipeline.
 *
 * Keys are page locations as emitted by the Markdown loader, and demo keys are
 * marker values as written in Markdown. Both are matched exactly so the loader,
 * the server, and the client always select the same pipeline.
 *
 * Add a page or demo only after the capability is verified for it.
 *
 * @type {import('./demoPipeline.mjs').DemoPipelineAllowlist}
 */
export const demoPipelineAllowlist = {
  'docs/pages/experiments/docs/demos.md': {
    demos: { 'DemoInDocs.js': { source: true } },
  },
};

/** @type {import('./demoPipeline.mjs').DocsInfraDemoFlags} */
const DISABLED_FLAGS = {
  source: false,
  liveEdit: false,
  languageTransform: false,
};

/**
 * @param {string} value
 */
function normalizePath(value) {
  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

/**
 * @param {import('./demoPipeline.mjs').DemoPipelineSelection} selection
 * @param {import('./demoPipeline.mjs').DemoPipelineAllowlist} allowlist
 */
function findEntry(selection, allowlist) {
  const entry = allowlist[normalizePath(selection.pagePath)];
  if (!entry) {
    return null;
  }

  const demoEntry = entry.demos?.[selection.demoName];

  // An exact page-and-demo entry wins over the page entry.
  if (demoEntry) {
    return { ...entry.flags, ...demoEntry };
  }

  // A page listing specific demos does not apply to its other demos.
  if (entry.demos) {
    return null;
  }

  return entry.flags ?? {};
}

/**
 * Resolves whether a single demo marker renders through docs-infra.
 *
 * Precedence: an exact page-and-demo entry, then a page entry, then legacy.
 *
 * @param {import('./demoPipeline.mjs').DemoPipelineSelection} selection
 * @param {import('./demoPipeline.mjs').DemoPipelineAllowlist} [allowlist]
 * @returns {import('./demoPipeline.mjs').DemoPipeline}
 */
export function shouldUseDocsInfraPipeline(selection, allowlist = demoPipelineAllowlist) {
  return findEntry(selection, allowlist) ? 'docs-infra' : 'legacy';
}

/**
 * Resolves the docs-infra capabilities enabled for a single demo marker.
 * Every capability is off for demos that are not allowlisted.
 *
 * @param {import('./demoPipeline.mjs').DemoPipelineSelection} selection
 * @param {import('./demoPipeline.mjs').DemoPipelineAllowlist} [allowlist]
 * @returns {import('./demoPipeline.mjs').DocsInfraDemoFlags}
 */
export function resolveDocsInfraDemoFlags(selection, allowlist = demoPipelineAllowlist) {
  return { ...DISABLED_FLAGS, ...findEntry(selection, allowlist) };
}
