// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/select-fields/select-fields.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/select-fields/SimpleSelectField.js': {
          js: require('docs/src/pages/demos/select-fields/SimpleSelectField').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/select-fields/SimpleSelectField'), 'utf8')
`,
        },
        'pages/demos/select-fields/FocusSelectField.js': {
          js: require('docs/src/pages/demos/select-fields/FocusSelectField').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/select-fields/FocusSelectField'), 'utf8')
`,
        },
        'pages/demos/select-fields/FilteredSelectField.js': {
          js: require('docs/src/pages/demos/select-fields/FilteredSelectField').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/select-fields/FilteredSelectField'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
