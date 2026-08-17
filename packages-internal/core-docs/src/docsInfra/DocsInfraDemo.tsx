import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { DocsInfraDemoFlags } from '@mui/internal-markdown/demoPipeline';
import type { DocsInfraDemoData } from '@mui/internal-markdown/precomputeDocsInfraDemo';
import { Demo, type DemoProps } from '../Demo/Demo';

// Keep these in sync with docs/public/static/styles/prism-okaidia.css.
const prismColors = {
  comment: '#b2b2b2',
  punctuation: '#f8f8f2',
  property: '#fc929e',
  boolean: '#b78eff',
  string: '#a6e22e',
  operator: '#f8f8f2',
  function: '#e6db74',
  keyword: '#66d9ef',
  regex: '#fd971f',
};

/** Maps docs-infra syntax tokens to their legacy Prism equivalents. */
const DocsInfraSourceScope = styled('div')({
  '& .pl-c': { color: prismColors.comment },
  '& .pl-c1': { color: prismColors.operator },
  '& .pl-s .pl-v': { color: prismColors.boolean },
  '& .pl-e, & .pl-en': { color: prismColors.function },
  '& .pl-smi, & .pl-s .pl-s1': { color: prismColors.operator },
  '& .pl-ent': { color: prismColors.property },
  '& .pl-k': { color: prismColors.keyword },
  '& .pl-s, & .pl-pds, & .pl-s .pl-pse .pl-s1, & .pl-sr, & .pl-sr .pl-cce, & .pl-sr .pl-sre, & .pl-sr .pl-sra':
    { color: prismColors.string },
  '& .pl-v, & .pl-smw': { color: prismColors.operator },
  '& .pl-bu': { color: prismColors.property },
  '& .pl-ii, & .pl-c2': {
    color: prismColors.punctuation,
    backgroundColor: prismColors.property,
  },
  '& .pl-sr .pl-cce': {
    color: prismColors.regex,
    fontWeight: 'bold',
  },
  '& .pl-ml': { color: prismColors.keyword },
  '& .pl-md, & .pl-mc': { color: prismColors.property },
  '& .pl-mh, & .pl-mh .pl-en, & .pl-ms': {
    color: prismColors.boolean,
    fontWeight: 'bold',
  },
  '& .pl-mi': {
    color: prismColors.punctuation,
    fontStyle: 'italic',
  },
  '& .pl-mb': {
    color: prismColors.punctuation,
    fontWeight: 'bold',
  },
  '& .pl-mi1': { color: prismColors.string },
  '& .pl-mi2, & .pl-ba, & .pl-sg': { color: prismColors.comment },
  '& .pl-mdr': {
    color: prismColors.function,
    fontWeight: 'bold',
  },
  '& .pl-corl': {
    color: prismColors.operator,
    textDecoration: 'underline',
  },
  '& .di-num, & .di-bool': { color: prismColors.boolean },
  '& .di-n, & .di-this': { color: prismColors.keyword },
  '& .di-ps, & .di-cp, & .di-ht': { color: prismColors.property },
  '& .di-op, & .di-op.di-jv': { color: prismColors.property },
  '& .di-ak, & .di-da': { color: prismColors.string },
  '& .di-av, & .di-jt': { color: prismColors.function },
  // Prism colours JSX element names as tags, not as functions.
  '& .di-jsx': { color: prismColors.property },
  '& .di-ae, & .di-cv, & .di-bt, & .di-pu, & .di-te, & .di-td, & .di-jv': {
    color: prismColors.punctuation,
  },
  '& .di-ps .pl-pds': { color: prismColors.property },
  '& .di-av .pl-pds': { color: prismColors.punctuation },
  '& .language-css .pl-e': { color: prismColors.string },
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
