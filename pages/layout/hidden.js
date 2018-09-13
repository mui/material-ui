import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/layout/hidden/hidden.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layout/hidden/BreakpointUp.js': {
          js: require('docs/pages/layout/hidden/BreakpointUp').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/layout/hidden/BreakpointUp'), 'utf8')
`,
        },
        'pages/layout/hidden/BreakpointDown.js': {
          js: require('docs/pages/layout/hidden/BreakpointDown').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/layout/hidden/BreakpointDown'), 'utf8')
`,
        },
        'pages/layout/hidden/BreakpointOnly.js': {
          js: require('docs/pages/layout/hidden/BreakpointOnly').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/layout/hidden/BreakpointOnly'), 'utf8')
`,
        },
        'pages/layout/hidden/GridIntegration.js': {
          js: require('docs/pages/layout/hidden/GridIntegration').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/layout/hidden/GridIntegration'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
