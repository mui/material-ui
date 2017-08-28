// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/discover-more/team.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/discover-more/Team.js': {
          js: require('docs/src/pages/discover-more/Team').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/discover-more/Team'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
