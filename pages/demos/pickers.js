import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./pickers${props.lang}.md`)}
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

export default Page;
