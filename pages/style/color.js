import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./color-${props.lang}.md`)}
      demos={{
        'pages/style/color/Color.js': {
          js: require('docs/src/pages/style/color/Color').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/color/Color'), 'utf8')
`,
        },
        'pages/style/color/ColorTool.js': {
          js: require('docs/src/pages/style/color/ColorTool').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/color/ColorTool'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
