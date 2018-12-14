import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./breakpoints${props.lang}.md`)}
      demos={{
        'pages/layout/breakpoints/MediaQuery.js': {
          js: require('docs/src/pages/layout/breakpoints/MediaQuery').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/breakpoints/MediaQuery'), 'utf8')
`,
        },
        'pages/layout/breakpoints/WithWidth.js': {
          js: require('docs/src/pages/layout/breakpoints/WithWidth').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/breakpoints/WithWidth'), 'utf8')
`,
        },
        'pages/layout/breakpoints/RenderPropsWithWidth.js': {
          js: require('docs/src/pages/layout/breakpoints/RenderPropsWithWidth').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/breakpoints/RenderPropsWithWidth'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
