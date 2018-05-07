import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/style/color/color.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/color/Color.js': {
          js: require('docs/src/pages/style/color/Color').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/color/Color'), 'utf8')
`,
        },
        'pages/style/color/ColorChooser.js': {
          js: require('docs/src/pages/style/color/ColorChooser').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/color/ColorChooser'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
