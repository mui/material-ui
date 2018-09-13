import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/pages/lab/toggle-button/toggle-button.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/lab/toggle-button/ToggleButtons.js': {
          js: require('docs/pages/lab/toggle-button/ToggleButtons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/lab/toggle-button/ToggleButtons'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
