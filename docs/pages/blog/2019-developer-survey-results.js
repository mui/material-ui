import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'blog/2019-developer-survey-results';
const requireRaw = require.context('!raw-loader!./', false, /2019-developer-survey-results\.md$/);

// eslint-disable-next-line react/prop-types
export default function Page({ docs }) {
  return <TopLayoutBlog docs={docs} />;
}

Page.getInitialProps = async (ctx) => {
  const { demos, docs } = await prepareMarkdown({ ctx, pageFilename, requireRaw });
  return { demos, docs };
};
