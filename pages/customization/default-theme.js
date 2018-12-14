import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./default-theme${props.lang}.md`)}
      demos={{
        'pages/customization/default-theme/DefaultTheme.js': {
          js: require('docs/src/pages/customization/default-theme/DefaultTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/default-theme/DefaultTheme'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
