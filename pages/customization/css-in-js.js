// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/css-in-js.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/customization/CssInJs.js': {
          js: require('docs/src/pages/customization/CssInJs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/CssInJs'), 'utf8')
`,
        },
        'pages/customization/RtlOptOut.js': {
          js: require('docs/src/pages/customization/RtlOptOut').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/RtlOptOut'), 'utf8')
`,
        },
        'pages/customization/JssRegistry.js': {
          js: require('docs/src/pages/customization/JssRegistry').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/JssRegistry'), 'utf8')
`,
        },
        'pages/customization/ReactJss.js': {
          js: require('docs/src/pages/customization/ReactJss').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/ReactJss'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
