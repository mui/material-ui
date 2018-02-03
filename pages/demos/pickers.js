import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/pickers/pickers.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/pickers/DatePickers.js': {
          js: require('docs/src/pages/demos/pickers/DatePickers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/pickers/DatePickers'), 'utf8')
`,
        },
        'pages/demos/pickers/TimePickers.js': {
          js: require('docs/src/pages/demos/pickers/TimePickers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/pickers/TimePickers'), 'utf8')
`,
        },
        'pages/demos/pickers/DateAndTimePickers.js': {
          js: require('docs/src/pages/demos/pickers/DateAndTimePickers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/pickers/DateAndTimePickers'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
