import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/utils/click-away-listener/click-away-listener.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/click-away-listener/ClickAway.js': {
          js: require('docs/pages/utils/click-away-listener/ClickAway').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/utils/click-away-listener/ClickAway'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
