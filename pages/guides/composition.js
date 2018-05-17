import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/guides/composition/composition.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/guides/composition/Composition.js': {
          js: require('docs/src/pages/guides/composition/Composition').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/composition/Composition'), 'utf8')
`,
        },
        'pages/guides/composition/ComponentProperty.js': {
          js: require('docs/src/pages/guides/composition/ComponentProperty').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/composition/ComponentProperty'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
