import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./lists${props.lang}.md`)}
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
        'pages/demos/lists/NestedList.js': {
          js: require('docs/src/pages/demos/lists/NestedList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/NestedList'), 'utf8')
`,
        },
        'pages/demos/lists/SelectedListItem.js': {
          js: require('docs/src/pages/demos/lists/SelectedListItem').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/SelectedListItem'), 'utf8')
`,
        },
        'pages/demos/lists/PinnedSubheaderList.js': {
          js: require('docs/src/pages/demos/lists/PinnedSubheaderList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/PinnedSubheaderList'), 'utf8')
`,
        },
        'pages/demos/lists/AlignItemsList.js': {
          js: require('docs/src/pages/demos/lists/AlignItemsList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/lists/AlignItemsList'), 'utf8')
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

export default Page;
