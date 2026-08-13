// @ts-check

/**
 * Master switch for the docs-infra demo pipeline.
 *
 * Set to `false` to send every demo back to the legacy pipeline without
 * touching the Markdown markers that opted in.
 */
export const docsInfraPipelineEnabled = true;

/**
 * Capabilities enabled for every demo that opted in with `"docsInfra": true`.
 *
 * Markers select the pipeline; this list decides what the pipeline does, so a
 * capability can be rolled out to every migrated demo at once.
 *
 * @type {import('./demoPipeline.mjs').DocsInfraDemoFlags}
 */
export const docsInfraDemoFlags = {
  source: true,
  liveEdit: false,
  languageTransform: false,
};

/** @type {import('./demoPipeline.mjs').DocsInfraDemoFlags} */
const DISABLED_FLAGS = {
  source: false,
  liveEdit: false,
  languageTransform: false,
};

/**
 * Resolves whether a single demo marker renders through docs-infra.
 *
 * @param {import('./demoPipeline.mjs').DemoMarker} marker
 * @returns {import('./demoPipeline.mjs').DemoPipeline}
 */
export function shouldUseDocsInfraPipeline(marker) {
  return docsInfraPipelineEnabled && marker.docsInfra === true ? 'docs-infra' : 'legacy';
}

/**
 * Resolves the docs-infra capabilities enabled for a single demo marker.
 * Every capability is off for demos that did not opt in.
 *
 * @param {import('./demoPipeline.mjs').DemoMarker} marker
 * @returns {import('./demoPipeline.mjs').DocsInfraDemoFlags}
 */
export function resolveDocsInfraDemoFlags(marker) {
  return shouldUseDocsInfraPipeline(marker) === 'docs-infra'
    ? { ...docsInfraDemoFlags }
    : { ...DISABLED_FLAGS };
}
