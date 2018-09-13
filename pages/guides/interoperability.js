import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/guides/interoperability/interoperability.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/guides/interoperability/ReactJss.js': {
          js: require('docs/pages/guides/interoperability/ReactJss').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/pages/guides/interoperability/ReactJss'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
