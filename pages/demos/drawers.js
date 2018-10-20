import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./drawers${props.lang}.md`)}
      demos={{
        'pages/demos/drawers/TemporaryDrawer.js': {
          js: require('docs/src/pages/demos/drawers/TemporaryDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/TemporaryDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/SwipeableTemporaryDrawer.js': {
          js: require('docs/src/pages/demos/drawers/SwipeableTemporaryDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/SwipeableTemporaryDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/PermanentDrawerLeft.js': {
          js: require('docs/src/pages/demos/drawers/PermanentDrawerLeft').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/PermanentDrawerLeft'), 'utf8')
`,
        },
        'pages/demos/drawers/PermanentDrawerRight.js': {
          js: require('docs/src/pages/demos/drawers/PermanentDrawerRight').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/PermanentDrawerRight'), 'utf8')
`,
        },
        'pages/demos/drawers/ClippedDrawer.js': {
          js: require('docs/src/pages/demos/drawers/ClippedDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/ClippedDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/PersistentDrawerLeft.js': {
          js: require('docs/src/pages/demos/drawers/PersistentDrawerLeft').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/PersistentDrawerLeft'), 'utf8')
`,
        },
        'pages/demos/drawers/PersistentDrawerRight.js': {
          js: require('docs/src/pages/demos/drawers/PersistentDrawerRight').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/PersistentDrawerRight'), 'utf8')
`,
        },
        'pages/demos/drawers/MiniDrawer.js': {
          js: require('docs/src/pages/demos/drawers/MiniDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/MiniDrawer'), 'utf8')
`,
        },
        'pages/demos/drawers/ResponsiveDrawer.js': {
          js: require('docs/src/pages/demos/drawers/ResponsiveDrawer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/drawers/ResponsiveDrawer'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
