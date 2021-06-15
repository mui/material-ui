import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';
import {
  pageFilename,
  requireDemo,
  requireRaw,
} from '!demo-loader!docs/src/pages/production-error/index.md';

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} disableAd docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
