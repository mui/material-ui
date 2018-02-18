import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/style/typography/typography.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/typography/Types.js': {
          js: require('docs/src/pages/style/typography/Types').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/typography/Types'), 'utf8')
`,
        },
        'pages/style/typography/TypographyTheme.js': {
          js: require('docs/src/pages/style/typography/TypographyTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/typography/TypographyTheme'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
