// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/lists/lists.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/lists/SimpleList.js': {
          js: require('docs/src/pages/demos/lists/SimpleList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/SimpleList'), 'utf8')
`,
        },
        'pages/demos/lists/FolderList.js': {
          js: require('docs/src/pages/demos/lists/FolderList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/FolderList'), 'utf8')
`,
        },
        'pages/demos/lists/InsetList.js': {
          js: require('docs/src/pages/demos/lists/InsetList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/InsetList'), 'utf8')
`,
        },
        'pages/demos/lists/CheckboxList.js': {
          js: require('docs/src/pages/demos/lists/CheckboxList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/CheckboxList'), 'utf8')
`,
        },
        'pages/demos/lists/CheckboxListSecondary.js': {
          js: require('docs/src/pages/demos/lists/CheckboxListSecondary').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/CheckboxListSecondary'), 'utf8')
`,
        },
        'pages/demos/lists/SwitchListSecondary.js': {
          js: require('docs/src/pages/demos/lists/SwitchListSecondary').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/SwitchListSecondary'), 'utf8')
`,
        },
        'pages/demos/lists/InteractiveList.js': {
          js: require('docs/src/pages/demos/lists/InteractiveList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/InteractiveList'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
