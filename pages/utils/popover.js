import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/popover/popover.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/popover/SimplePopover.js': {
          js: require('docs/src/pages/utils/popover/SimplePopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popover/SimplePopover'), 'utf8')
`,
        },
        'pages/utils/popover/AnchorPlayground.js': {
          js: require('docs/src/pages/utils/popover/AnchorPlayground').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popover/AnchorPlayground'), 'utf8')
`,
        },
        'pages/utils/popover/MouseOverPopover.js': {
          js: require('docs/src/pages/utils/popover/MouseOverPopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popover/MouseOverPopover'), 'utf8')
`,
        },
        'pages/utils/popover/RenderPropsPopover.js': {
          js: require('docs/src/pages/utils/popover/RenderPropsPopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popover/RenderPropsPopover'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
