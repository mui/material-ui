import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/selects/selects.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/selects/SimpleSelect.js': {
          js: require('docs/src/pages/demos/selects/SimpleSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/SimpleSelect'), 'utf8')
`,
        },
        'pages/demos/selects/NativeSelect.js': {
          js: require('docs/src/pages/demos/selects/NativeSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/NativeSelect'), 'utf8')
`,
        },
        'pages/demos/selects/MultipleSelect.js': {
          js: require('docs/src/pages/demos/selects/MultipleSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/MultipleSelect'), 'utf8')
`,
        },
        'pages/demos/selects/DialogSelect.js': {
          js: require('docs/src/pages/demos/selects/DialogSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/DialogSelect'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
