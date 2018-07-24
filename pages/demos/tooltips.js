import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/tooltips/tooltips.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/tooltips/SimpleTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/SimpleTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/SimpleTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/PositionedTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/PositionedTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/PositionedTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/ControlledTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/ControlledTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/ControlledTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/TriggersTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/TriggersTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/TriggersTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/TransitionsTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/TransitionsTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/TransitionsTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/DelayTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/DelayTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/DelayTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/CustomizedTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/CustomizedTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/CustomizedTooltips'), 'utf8')
`,
        },
        'pages/demos/tooltips/DisabledTooltips.js': {
          js: require('docs/src/pages/demos/tooltips/DisabledTooltips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tooltips/DisabledTooltips'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
