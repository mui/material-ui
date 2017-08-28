// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/buttons/buttons.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/buttons/FlatButtons.js': {
          js: require('docs/src/pages/demos/buttons/FlatButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/FlatButtons'), 'utf8')
`,
        },
        'pages/demos/buttons/RaisedButtons.js': {
          js: require('docs/src/pages/demos/buttons/RaisedButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/RaisedButtons'), 'utf8')
`,
        },
        'pages/demos/buttons/FloatingActionButtons.js': {
          js: require('docs/src/pages/demos/buttons/FloatingActionButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/FloatingActionButtons'), 'utf8')
`,
        },
        'pages/demos/buttons/IconButtons.js': {
          js: require('docs/src/pages/demos/buttons/IconButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/IconButtons'), 'utf8')
`,
        },
        'pages/demos/buttons/ButtonBases.js': {
          js: require('docs/src/pages/demos/buttons/ButtonBases').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/ButtonBases'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
