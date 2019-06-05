/* eslint-disable no-underscore-dangle */

import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Router } from 'next/router';
import PropTypes from 'prop-types';
import { getHeaders, getContents } from 'docs/src/modules/utils/parseMarkdown';
import PageContext from 'docs/src/modules/components/PageContext';

function MarkdownDocsContents(props) {
  const { children, markdownLocation: markdownLocationProp, markdown } = props;
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
      }/${Router._rewriteUrlForNextExport(kebabCase(component))})`,
  )
  .join('\n')}
  `);
  }

  return children({ contents, markdownLocation });
}

MarkdownDocsContents.propTypes = {
  children: PropTypes.func.isRequired,
  markdown: PropTypes.string.isRequired,
  markdownLocation: PropTypes.string,
};

export default MarkdownDocsContents;
