import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  requireDemo,
} from '!@material-ui/markdown/loader!docs/src/pages/customization/styled/styled.md';

const pageFilename = 'system/styled';
const requireDemo = require.context('docs/src/pages/system/styled', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/system/styled',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}
