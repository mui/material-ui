import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./selection-controls${props.lang}.md`)}
      demos={{
        'pages/demos/selection-controls/Checkboxes.js': {
          js: require('docs/src/pages/demos/selection-controls/Checkboxes').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/Checkboxes'), 'utf8')
`,
        },
        'pages/demos/selection-controls/CheckboxLabels.js': {
          js: require('docs/src/pages/demos/selection-controls/CheckboxLabels').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/CheckboxLabels'), 'utf8')
`,
        },
        'pages/demos/selection-controls/CheckboxesGroup.js': {
          js: require('docs/src/pages/demos/selection-controls/CheckboxesGroup').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/CheckboxesGroup'), 'utf8')
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
        'pages/demos/selection-controls/SwitchesGroup.js': {
          js: require('docs/src/pages/demos/selection-controls/SwitchesGroup').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selection-controls/SwitchesGroup'), 'utf8')
`,
        },
        'pages/demos/selection-controls/CustomizedSwitches.js': {
          js: require('docs/src/pages/demos/selection-controls/CustomizedSwitches').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve(
    'docs/src/pages/demos/selection-controls/CustomizedSwitches'
  ), 'utf8')
`,
        },
        'pages/demos/selection-controls/FormControlLabelPosition.js': {
          js: require('docs/src/pages/demos/selection-controls/FormControlLabelPosition').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve(
    'docs/src/pages/demos/selection-controls/FormControlLabelPosition'
  ), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
