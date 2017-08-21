// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './card-header.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
