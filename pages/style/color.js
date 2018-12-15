import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./color${props.lang}.md`)}
      demos={{
        'pages/style/color/Color.js': {
          js: require('docs/src/pages/style/color/Color').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/color/Color'), 'utf8')
`,
        },
        'pages/style/color/ColorTool.js': {
          js: require('docs/src/pages/style/color/ColorTool').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/color/ColorTool'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
