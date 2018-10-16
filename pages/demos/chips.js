import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
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

export default withRoot(Page);
