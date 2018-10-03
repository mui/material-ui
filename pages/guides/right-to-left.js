import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./right-to-left-${props.lang}.md`)}
      demos={{
        'pages/guides/right-to-left/Direction.js': {
          js: require('docs/src/pages/guides/right-to-left/Direction').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/right-to-left/Direction'), 'utf8')
`,
        },
        'pages/guides/right-to-left/RtlOptOut.js': {
          js: require('docs/src/pages/guides/right-to-left/RtlOptOut').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/right-to-left/RtlOptOut'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
