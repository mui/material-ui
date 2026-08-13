import * as React from 'react';
import type { DocsInfraDemoFlags } from '@mui/internal-markdown/demoPipeline';
import type { DocsInfraDemoData } from '@mui/internal-markdown/precomputeDocsInfraDemo';
import { Demo, type DemoProps } from '../Demo/Demo';

export interface DocsInfraDemoProps extends DemoProps {
  flags: DocsInfraDemoFlags;
  /** Source graph emitted by the Markdown loader for allowlisted demos. */
  docsInfra?: DocsInfraDemoData;
}

/**
 * Renders an allowlisted demo through docs-infra.
 *
 * Capabilities are added one at a time behind `flags`; anything not yet enabled
 * renders through the legacy demo, so an allowlist entry alone never changes a
 * page.
 */
export function DocsInfraDemo(props: DocsInfraDemoProps) {
  const { flags, docsInfra, ...other } = props;

  if (!flags.source || !docsInfra) {
    return <Demo {...other} />;
  }

  // The displayed source comes from the docs-infra source graph instead of the
  // Markdown loader's own file read.
  return <Demo {...other} demo={{ ...other.demo, raw: docsInfra.source }} />;
}
