import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/refresh-indicator/refresh-indicator.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/refresh-indicator/ReadyIndicator.js': {
          js: require('docs/src/pages/demos/refresh-indicator/ReadyIndicator').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/refresh-indicator/ReadyIndicator'), 'utf8')
`,
        },
        'pages/demos/refresh-indicator/LoadingIndicator.js': {
          js: require('docs/src/pages/demos/refresh-indicator/LoadingIndicator').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/refresh-indicator/LoadingIndicator'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
