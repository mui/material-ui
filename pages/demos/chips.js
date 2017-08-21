// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/chips/chips.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/chips/Chips.js': {
          js: require('docs/src/pages/demos/chips/Chips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/chips/Chips'), 'utf8')
`,
        },
        'pages/demos/chips/ChipsArray.js': {
          js: require('docs/src/pages/demos/chips/ChipsArray').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/chips/ChipsArray'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
