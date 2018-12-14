import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./use-media-query${props.lang}.md`)}
      demos={{
        'pages/layout/use-media-query/SimpleMediaQuery.js': {
          js: require('docs/src/pages/layout/use-media-query/SimpleMediaQuery').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/use-media-query/SimpleMediaQuery'), 'utf8')
`,
        },
        'pages/layout/use-media-query/ThemeHelper.js': {
          js: require('docs/src/pages/layout/use-media-query/ThemeHelper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/use-media-query/ThemeHelper'), 'utf8')
`,
        },
        'pages/layout/use-media-query/ServerSide.js': {
          js: require('docs/src/pages/layout/use-media-query/ServerSide').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/use-media-query/ServerSide'), 'utf8')
`,
        },
        'pages/layout/use-media-query/UseWidth.js': {
          js: require('docs/src/pages/layout/use-media-query/UseWidth').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/use-media-query/UseWidth'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
