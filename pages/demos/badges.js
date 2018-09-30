import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./badges-${props.lang}.md`)}
      demos={{
        'pages/demos/badges/SimpleBadge.js': {
          js: require('docs/src/pages/demos/badges/SimpleBadge').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/badges/SimpleBadge'), 'utf8')
`,
        },
        'pages/demos/badges/CustomizedBadge.js': {
          js: require('docs/src/pages/demos/badges/CustomizedBadge').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/badges/CustomizedBadge'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
