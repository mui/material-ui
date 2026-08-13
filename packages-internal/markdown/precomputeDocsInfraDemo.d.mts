import type { Externals } from '@mui/internal-docs-infra/CodeHighlighter/types';

export interface PrecomputeDocsInfraDemoOptions {
  /** Demo marker value as written in Markdown. */
  demoName: string;
  /** Absolute path of the demo entry file. */
  moduleFilepath: string;
  /** Contents of the sibling `.tsx.preview` file, when one exists. */
  previewSource?: string;
}

export interface DocsInfraDemoData {
  /** Entry source as loaded by docs-infra. */
  source: string;
  /** Displayed file name. */
  fileName: string;
  /** Source language reported by docs-infra. */
  language?: string;
  /** External imports collected from the source graph. */
  externals: Externals;
  /** Source URLs the demo depends on. */
  dependencies: string[];
}

export default function precomputeDocsInfraDemo(
  options: PrecomputeDocsInfraDemoOptions,
): Promise<DocsInfraDemoData>;
