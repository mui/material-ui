import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/default-theme/default-theme.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
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

export default withRoot(Page);
