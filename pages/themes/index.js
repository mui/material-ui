import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/themes/themes.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/themes/Themes.js': {
          js: require('docs/src/pages/themes/Themes').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/themes/Themes'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
