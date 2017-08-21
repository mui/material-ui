// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/style/icons.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/Icons.js': {
          js: require('docs/src/pages/style/Icons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/Icons'), 'utf8')
`,
        },
        'pages/style/SvgIcons.js': {
          js: require('docs/src/pages/style/SvgIcons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/SvgIcons'), 'utf8')
`,
        },
        'pages/style/SvgMaterialIcons.js': {
          js: require('docs/src/pages/style/SvgMaterialIcons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/SvgMaterialIcons'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
