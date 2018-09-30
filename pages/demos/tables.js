import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./tables-${props.lang}.md`)}
      demos={{
        'pages/demos/tables/SimpleTable.js': {
          js: require('docs/src/pages/demos/tables/SimpleTable').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tables/SimpleTable'), 'utf8')
`,
        },
        'pages/demos/tables/EnhancedTable.js': {
          js: require('docs/src/pages/demos/tables/EnhancedTable').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tables/EnhancedTable'), 'utf8')
`,
        },
        'pages/demos/tables/CustomPaginationActionsTable.js': {
          js: require('docs/src/pages/demos/tables/CustomPaginationActionsTable').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tables/CustomPaginationActionsTable'), 'utf8')
`,
        },
        'pages/demos/tables/CustomizedTable.js': {
          js: require('docs/src/pages/demos/tables/CustomizedTable').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tables/CustomizedTable'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
