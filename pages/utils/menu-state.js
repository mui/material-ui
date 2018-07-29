import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/menu-state/menu-state.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/menu-state/menu-state.js': {
          js: require('docs/src/pages/utils/menu-state/SimpleMenuState').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/menu-state/SimpleMenuState'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
