import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./portal-${props.lang}.md`)}
      demos={{
        'pages/utils/portal/SimplePortal.js': {
          js: require('docs/src/pages/utils/portal/SimplePortal').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/portal/SimplePortal'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
