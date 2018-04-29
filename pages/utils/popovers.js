import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/popovers/popovers.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/popovers/SimplePopover.js': {
          js: require('docs/src/pages/utils/popovers/SimplePopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popovers/SimplePopover'), 'utf8')
`,
        },
        'pages/utils/popovers/AnchorPlayground.js': {
          js: require('docs/src/pages/utils/popovers/AnchorPlayground').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popovers/AnchorPlayground'), 'utf8')
`,
        },
        'pages/utils/popovers/MouseOverPopover.js': {
          js: require('docs/src/pages/utils/popovers/MouseOverPopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popovers/MouseOverPopover'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
