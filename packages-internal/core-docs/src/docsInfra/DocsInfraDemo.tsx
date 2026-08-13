import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { DocsInfraDemoFlags } from '@mui/internal-markdown/demoPipeline';
import type { DocsInfraDemoData } from '@mui/internal-markdown/precomputeDocsInfraDemo';
import { Demo, type DemoProps } from '../Demo/Demo';

/**
 * Maps the Starry Night scope classes emitted by docs-infra to the okaidia
 * palette the Prism theme already uses, so a migrated demo matches its
 * neighbours. Scoped to migrated demos and removed once every demo migrates.
 */
const DocsInfraSourceScope = styled('div')({
  '& .pl-k': { color: '#66d9ef' },
  '& .pl-s, & .pl-pds': { color: '#a6e22e' },
  '& .pl-c1': { color: '#b78eff' },
  '& .pl-en, & .pl-e': { color: '#e6db74' },
  '& .pl-ent': { color: '#fc929e' },
  '& .pl-c': { color: '#b2b2b2' },
  '& .pl-smi, & .pl-v': { color: '#f8f8f2' },
});

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

  return (
    <DocsInfraSourceScope>
      <Demo
        {...other}
        demo={{ ...other.demo, raw: docsInfra.source, highlightedHtml: docsInfra.html }}
      />
    </DocsInfraSourceScope>
  );
}
