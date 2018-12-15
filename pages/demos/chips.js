import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./chips${props.lang}.md`)}
      demos={{
        'pages/demos/chips/Chips.js': {
          js: require('docs/src/pages/demos/chips/Chips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/chips/Chips'), 'utf8')
`,
        },
        'pages/demos/chips/OutlinedChips.js': {
          js: require('docs/src/pages/demos/chips/OutlinedChips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/chips/OutlinedChips'), 'utf8')
`,
        },
        'pages/demos/chips/ChipsPlayground.js': {
          js: require('docs/src/pages/demos/chips/ChipsPlayground').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/chips/ChipsPlayground'), 'utf8')
`,
        },
        'pages/demos/chips/ChipsArray.js': {
          js: require('docs/src/pages/demos/chips/ChipsArray').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/chips/ChipsArray'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
