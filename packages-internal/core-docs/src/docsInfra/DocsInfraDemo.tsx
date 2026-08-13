import * as React from 'react';
import type { DocsInfraDemoFlags } from '@mui/internal-markdown/demoPipeline';
import { Demo, type DemoProps } from '../Demo/Demo';

export interface DocsInfraDemoProps extends DemoProps {
  flags: DocsInfraDemoFlags;
}

/**
 * Renders an allowlisted demo through docs-infra.
 *
 * This is the only component allowed to import docs-infra. Capabilities are
 * added one at a time behind `flags`; anything not yet enabled renders through
 * the legacy demo, so an allowlist entry alone never changes a page.
 */
export function DocsInfraDemo(props: DocsInfraDemoProps) {
  const { flags, ...other } = props;
  return <Demo {...other} />;
}
