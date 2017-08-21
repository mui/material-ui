// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/selection-controls/selection-controls.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/selection-controls/Checkboxes.js': {
          js: require('docs/src/pages/demos/selection-controls/Checkboxes').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/Checkboxes'), 'utf8')
`,
        },
        'pages/demos/selection-controls/RadioButtonsGroup.js': {
          js: require('docs/src/pages/demos/selection-controls/RadioButtonsGroup').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/selection-controls/RadioButtonsGroup'), 'utf8')
`,
        },
        'pages/demos/selection-controls/RadioButtons.js': {
          js: require('docs/src/pages/demos/selection-controls/RadioButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/RadioButtons'), 'utf8')
`,
        },
        'pages/demos/selection-controls/Switches.js': {
          js: require('docs/src/pages/demos/selection-controls/Switches').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/Switches'), 'utf8')
`,
        },
        'pages/demos/selection-controls/SwitchLabels.js': {
          js: require('docs/src/pages/demos/selection-controls/SwitchLabels').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/SwitchLabels'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
