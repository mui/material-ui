import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/pages/demos/badges/badges.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/badges/SimpleBadge.js': {
          js: require('docs/pages/demos/badges/SimpleBadge').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/badges/SimpleBadge'), 'utf8')
`,
        },
        'pages/demos/badges/CustomizedBadge.js': {
          js: require('docs/pages/demos/badges/CustomizedBadge').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/badges/CustomizedBadge'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
