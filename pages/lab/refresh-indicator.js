import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/lab/refresh-indicator/refresh-indicator.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/lab/refresh-indicator/LoadingIndicator.js': {
          js: require('docs/src/pages/lab/refresh-indicator/LoadingIndicator').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/refresh-indicator/LoadingIndicator'), 'utf8')
`,
        },
        'pages/lab/refresh-indicator/ReadyIndicator.js': {
          js: require('docs/src/pages/lab/refresh-indicator/ReadyIndicator').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/refresh-indicator/ReadyIndicator'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
