import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/popovers/popovers.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/popovers/AnchorPlayground.js': {
          js: require('docs/src/pages/demos/popovers/AnchorPlayground').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/popovers/AnchorPlayground'), 'utf8')
`,
        },
        'pages/demos/popovers/MouseOverPopover.js': {
          js: require('docs/src/pages/demos/popovers/MouseOverPopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/popovers/MouseOverPopover'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
