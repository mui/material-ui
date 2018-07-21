import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/popper/popper.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/popper/SimplePopper.js': {
          js: require('docs/src/pages/utils/popper/SimplePopper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popper/SimplePopper'), 'utf8')
`,
        },
        'pages/utils/popper/PositionedPopper.js': {
          js: require('docs/src/pages/utils/popper/PositionedPopper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popper/PositionedPopper'), 'utf8')
`,
        },
        'pages/utils/popper/NoTransitionPopper.js': {
          js: require('docs/src/pages/utils/popper/NoTransitionPopper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popper/NoTransitionPopper'), 'utf8')
`,
        },
        'pages/utils/popper/FakedReferencePopper.js': {
          js: require('docs/src/pages/utils/popper/FakedReferencePopper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popper/FakedReferencePopper'), 'utf8')
`,
        },
        'pages/utils/popper/ScrollPlayground.js': {
          js: require('docs/src/pages/utils/popper/ScrollPlayground').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/popper/ScrollPlayground'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
