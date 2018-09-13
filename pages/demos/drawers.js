import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/drawers/drawers.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/drawers/TemporaryDrawer.js': {
          js: require('docs/pages/demos/drawers/TemporaryDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/TemporaryDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/SwipeableTemporaryDrawer.js': {
          js: require('docs/pages/demos/drawers/SwipeableTemporaryDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/SwipeableTemporaryDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/PermanentDrawer.js': {
          js: require('docs/pages/demos/drawers/PermanentDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/PermanentDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/PersistentDrawer.js': {
          js: require('docs/pages/demos/drawers/PersistentDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/PersistentDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/MiniDrawer.js': {
          js: require('docs/pages/demos/drawers/MiniDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/MiniDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/ResponsiveDrawer.js': {
          js: require('docs/pages/demos/drawers/ResponsiveDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/ResponsiveDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/ClippedDrawer.js': {
          js: require('docs/pages/demos/drawers/ClippedDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/drawers/ClippedDrawer'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
