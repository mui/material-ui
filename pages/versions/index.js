import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/versions/versions.md';

function Page() {
  return (
    <MarkdownDocs
      disableCarbon
      markdown={markdown}
      demos={{
        'pages/versions/Versions.js': {
          js: require('docs/src/pages/versions/Versions').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/versions/Versions'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
