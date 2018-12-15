import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./dividers${props.lang}.md`)}
      demos={{
        'pages/demos/dividers/ListDividers.js': {
          js: require('docs/src/pages/demos/dividers/ListDividers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dividers/ListDividers'), 'utf8')
`,
        },
        'pages/demos/dividers/InsetDividers.js': {
          js: require('docs/src/pages/demos/dividers/InsetDividers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dividers/InsetDividers'), 'utf8')
`,
        },
        'pages/demos/dividers/MiddleDividers.js': {
          js: require('docs/src/pages/demos/dividers/MiddleDividers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dividers/MiddleDividers'), 'utf8')
`,
        },
        'pages/demos/dividers/SubheaderDividers.js': {
          js: require('docs/src/pages/demos/dividers/SubheaderDividers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dividers/SubheaderDividers'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
