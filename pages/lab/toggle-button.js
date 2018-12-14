import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./toggle-button${props.lang}.md`)}
      demos={{
        'pages/lab/toggle-button/ToggleButtons.js': {
          js: require('docs/src/pages/lab/toggle-button/ToggleButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/toggle-button/ToggleButtons'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
