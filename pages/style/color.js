import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/style/color/color.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/color/Color.js': {
          js: require('docs/pages/style/color/Color').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/style/color/Color'), 'utf8')
`,
        },
        'pages/style/color/ColorTool.js': {
          js: require('docs/pages/style/color/ColorTool').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/style/color/ColorTool'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
