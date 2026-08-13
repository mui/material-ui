/**
 * Capabilities that a demo can opt into while docs-infra is being introduced.
 * Every flag is off until the matching docs-infra API is verified.
 */
export interface DocsInfraDemoFlags {
  source: boolean;
  liveEdit: boolean;
  languageTransform: boolean;
}

export type DemoPipeline = 'legacy' | 'docs-infra';

export interface DemoPipelineSelection {
  /**
   * Location of the Markdown page that renders the demo, for example
   * `/docs/data/material/components/buttons/buttons.md`.
   */
  pagePath: string;
  /**
   * Demo marker value as written in Markdown, for example `BasicButtons.js`.
   */
  demoName: string;
}

/**
 * Flags shared by every demo on a page, optionally narrowed per demo.
 */
export interface DemoPipelineAllowlistEntry {
  flags?: Partial<DocsInfraDemoFlags>;
  demos?: Record<string, Partial<DocsInfraDemoFlags>>;
}

export type DemoPipelineAllowlist = Record<string, DemoPipelineAllowlistEntry>;
