import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/guides/right-to-left.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/guides/Direction.js': {
          js: require('docs/src/pages/guides/Direction').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/Direction'), 'utf8')
`,
        },
        'pages/guides/RtlOptOut.js': {
          js: require('docs/src/pages/guides/RtlOptOut').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/RtlOptOut'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
