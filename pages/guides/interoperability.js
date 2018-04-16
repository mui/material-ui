import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/guides/interoperability/interoperability.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/guides/interoperability/ReactJss.js': {
          js: require('docs/src/pages/guides/interoperability/ReactJss').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/guides/interoperability/ReactJss'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
