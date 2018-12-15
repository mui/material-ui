import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./popover${props.lang}.md`)}
      demos={{
        'pages/utils/popover/SimplePopover.js': {
          js: require('docs/src/pages/utils/popover/SimplePopover').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popover/SimplePopover'), 'utf8')
`,
        },
        'pages/utils/popover/PopoverPopupState.js': {
          js: require('docs/src/pages/utils/popover/PopoverPopupState.js').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popover/PopoverPopupState'), 'utf8')
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

export default Page;
