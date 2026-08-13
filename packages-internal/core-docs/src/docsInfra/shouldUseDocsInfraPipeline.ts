import { demoPipelineAllowlist } from './demoPipelineAllowlist';
import type {
  DemoPipeline,
  DemoPipelineAllowlist,
  DemoPipelineSelection,
  DocsInfraDemoFlags,
} from './types';

const DISABLED_FLAGS: DocsInfraDemoFlags = {
  source: false,
  liveEdit: false,
  languageTransform: false,
};

function normalizePath(value: string) {
  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

function findEntry(selection: DemoPipelineSelection, allowlist: DemoPipelineAllowlist) {
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
 */
export function shouldUseDocsInfraPipeline(
  selection: DemoPipelineSelection,
  allowlist: DemoPipelineAllowlist = demoPipelineAllowlist,
): DemoPipeline {
  return findEntry(selection, allowlist) ? 'docs-infra' : 'legacy';
}

/**
 * Resolves the docs-infra capabilities enabled for a single demo marker.
 * Every capability is off for demos that are not allowlisted.
 */
export function resolveDocsInfraDemoFlags(
  selection: DemoPipelineSelection,
  allowlist: DemoPipelineAllowlist = demoPipelineAllowlist,
): DocsInfraDemoFlags {
  return { ...DISABLED_FLAGS, ...findEntry(selection, allowlist) };
}
