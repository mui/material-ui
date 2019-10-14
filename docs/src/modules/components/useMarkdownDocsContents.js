import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Router as Router2 } from 'next/router';
import { getHeaders, getContents } from 'docs/src/modules/utils/parseMarkdown';
import PageContext from 'docs/src/modules/components/PageContext';

export default function useMarkdownDocsContents(options) {
  const { markdownLocation: markdownLocationProp, markdown } = options;
  const contents = getContents(markdown);
  const headers = getHeaders(markdown);
  const { activePage } = React.useContext(PageContext);
  let markdownLocation = markdownLocationProp || activePage.pathname;

  if (!markdownLocationProp) {
    const token = markdownLocation.split('/');
    token.push(token[token.length - 1]);
    markdownLocation = token.join('/');

    if (headers.filename) {
      markdownLocation = headers.filename;
    } else {
      markdownLocation = `/docs/src/pages${markdownLocation}.md`;
    }
  }

  if (headers.components.length > 0) {
    const section = markdownLocation.split('/')[4];
    contents.push(`
## API

${headers.components
  .map(
    component =>
      `- [&lt;${component} /&gt;](${
        section === 'lab' ? '/lab/api' : '/api'
      }/${Router2._rewriteUrlForNextExport(kebabCase(component))})`,
  )
  .join('\n')}
  `);
  }

  return { contents, markdownLocation };
}
