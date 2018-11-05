import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      enableCodeLanguageSwitch
      markdown={req(`./app-bar${props.lang}.md`)}
      demos={{
        'pages/demos/app-bar/SimpleAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/SimpleAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/SimpleAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/SimpleAppBar.tsx'), 'utf8')
`,
        },
        'pages/demos/app-bar/ButtonAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/ButtonAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/ButtonAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/ButtonAppBar.tsx'), 'utf8')
`,
        },
        'pages/demos/app-bar/MenuAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/MenuAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/MenuAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/MenuAppBar.tsx'), 'utf8')
`,
        },
        'pages/demos/app-bar/DenseAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/DenseAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/DenseAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/DenseAppBar.tsx'), 'utf8')
`,
        },
        'pages/demos/app-bar/SearchAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/SearchAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/SearchAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/SearchAppBar.tsx'), 'utf8')
`,
        },
        'pages/demos/app-bar/PrimarySearchAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/PrimarySearchAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/PrimarySearchAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/PrimarySearchAppBar.tsx'), 'utf8')
`,
        },
        'pages/demos/app-bar/BottomAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/BottomAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/BottomAppBar'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/BottomAppBar.tsx'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
