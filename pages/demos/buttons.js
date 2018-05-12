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
        'pages/demos/buttons/OutlinedButtons.js': {
          js: require('docs/src/pages/demos/buttons/OutlinedButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/OutlinedButtons'), 'utf8')
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
        'pages/demos/buttons/FloatingActionButtonZoom.js': {
          js: require('docs/src/pages/demos/buttons/FloatingActionButtonZoom').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/FloatingActionButtonZoom'), 'utf8')
`,
        },
        'pages/demos/buttons/ButtonSizes.js': {
          js: require('docs/src/pages/demos/buttons/ButtonSizes').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/ButtonSizes'), 'utf8')
`,
        },
        'pages/demos/buttons/IconButtons.js': {
          js: require('docs/src/pages/demos/buttons/IconButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/IconButtons'), 'utf8')
`,
        },
        'pages/demos/buttons/IconLabelButtons.js': {
          js: require('docs/src/pages/demos/buttons/IconLabelButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/IconLabelButtons'), 'utf8')
`,
        },
        'pages/demos/buttons/CustomizedButtons.js': {
          js: require('docs/src/pages/demos/buttons/CustomizedButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/buttons/CustomizedButtons'), 'utf8')
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
