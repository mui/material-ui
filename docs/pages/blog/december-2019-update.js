import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'blog/december-2019-update';
const requireRaw = require.context('!raw-loader!./', false, /december-2019-update\.md$/);

export default function Page({ docs }) {
  return <TopLayoutBlog docs={docs} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
