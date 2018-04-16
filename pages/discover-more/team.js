import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/discover-more/team/team.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/discover-more/team/Team.js': {
          js: require('docs/src/pages/discover-more/team/Team').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/discover-more/team/Team'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
