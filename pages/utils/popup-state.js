import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/popup-state/popup-state.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/popup-state/MenuPopupState.js': {
          js: require('docs/src/pages/utils/popup-state/MenuPopupState').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popup-state/MenuPopupState'), 'utf8')
`,
        },
        'pages/utils/popup-state/PopoverPopupState.js': {
          js: require('docs/src/pages/utils/popup-state/PopoverPopupState').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popup-state/PopoverPopupState'), 'utf8')
`,
        },
        'pages/utils/popup-state/PopperPopupState.js': {
          js: require('docs/src/pages/utils/popup-state/PopperPopupState').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popup-state/PopperPopupState'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
