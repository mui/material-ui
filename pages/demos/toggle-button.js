// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/toggle-button/toggle-button.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/toggle-button/NormalToggleButton.js': {
          js: require('docs/src/pages/demos/toggle-button/NormalToggleButton').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/toggle-button/NormalToggleButton'), 'utf8')
`,
        },
        'pages/demos/toggle-button/ExclusiveToggleButton.js': {
          js: require('docs/src/pages/demos/toggle-button/ExclusiveToggleButton').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/toggle-button/ExclusiveToggleButton'), 'utf8')
`,
        },
        'pages/demos/toggle-button/ToggleIcons.js': {
          js: require('docs/src/pages/demos/toggle-button/ToggleIcons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/toggle-button/ToggleIcons'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
