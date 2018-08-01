import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/layout/grid/grid.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layout/grid/SpacingGrid.js': {
          js: require('docs/src/pages/layout/grid/SpacingGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/SpacingGrid'), 'utf8')
`,
        },
        'pages/layout/grid/FullWidthGrid.js': {
          js: require('docs/src/pages/layout/grid/FullWidthGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/FullWidthGrid'), 'utf8')
`,
        },
        'pages/layout/grid/CenteredGrid.js': {
          js: require('docs/src/pages/layout/grid/CenteredGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/CenteredGrid'), 'utf8')
`,
        },
        'pages/layout/grid/InteractiveGrid.js': {
          js: require('docs/src/pages/layout/grid/InteractiveGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/InteractiveGrid'), 'utf8')
`,
        },
        'pages/layout/grid/AutoGrid.js': {
          js: require('docs/src/pages/layout/grid/AutoGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/AutoGrid'), 'utf8')
`,
        },
        'pages/layout/grid/CSSGrid.js': {
          js: require('docs/src/pages/layout/grid/CSSGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/CSSGrid'), 'utf8')
`,
        },
        'pages/layout/grid/NestedGrid.js': {
          js: require('docs/src/pages/layout/grid/NestedGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/NestedGrid'), 'utf8')
`,
        },
        'pages/layout/grid/ComplexGrid.js': {
          js: require('docs/src/pages/layout/grid/ComplexGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/ComplexGrid'), 'utf8')
`,
        },
        'pages/layout/grid/AutoGridNoWrap.js': {
          js: require('docs/src/pages/layout/grid/AutoGridNoWrap').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/grid/AutoGridNoWrap'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
