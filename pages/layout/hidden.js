// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/layout/hidden.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layout/BreakpointUp.js': {
          js: require('docs/src/pages/layout/BreakpointUp').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/BreakpointUp'), 'utf8')
`,
        },
        'pages/layout/BreakpointDown.js': {
          js: require('docs/src/pages/layout/BreakpointDown').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/BreakpointDown'), 'utf8')
`,
        },
        'pages/layout/BreakpointOnly.js': {
          js: require('docs/src/pages/layout/BreakpointOnly').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/BreakpointOnly'), 'utf8')
`,
        },
        'pages/layout/GridIntegration.js': {
          js: require('docs/src/pages/layout/GridIntegration').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/GridIntegration'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
