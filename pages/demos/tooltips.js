// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/tooltips/tooltips.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/tooltips/UncontrolledButtonTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/UncontrolledButtonTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/UncontrolledButtonTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/ControlledButtonTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/ControlledButtonTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/ControlledButtonTooltips'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
