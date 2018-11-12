import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./basics${props.lang}.md`)}
      demos={{
        'pages/css-in-js/basics/Hook.js': {
          js: require('docs/src/pages/css-in-js/basics/Hook').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/Hook'), 'utf8')
`,
        },
        'pages/css-in-js/basics/StyledComponents.js': {
          js: require('docs/src/pages/css-in-js/basics/StyledComponents').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/StyledComponents'), 'utf8')
`,
        },
        'pages/css-in-js/basics/HigherOrderComponent.js': {
          js: require('docs/src/pages/css-in-js/basics/HigherOrderComponent').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/HigherOrderComponent'), 'utf8')
`,
        },
        'pages/css-in-js/basics/RenderProps.js': {
          js: require('docs/src/pages/css-in-js/basics/RenderProps').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/RenderProps'), 'utf8')
`,
        },
        'pages/css-in-js/basics/AdaptingHook.js': {
          js: require('docs/src/pages/css-in-js/basics/AdaptingHook').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/AdaptingHook'), 'utf8')
`,
        },
        'pages/css-in-js/basics/AdaptingStyledComponents.js': {
          js: require('docs/src/pages/css-in-js/basics/AdaptingStyledComponents').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/AdaptingStyledComponents'), 'utf8')
`,
        },
        'pages/css-in-js/basics/AdaptingHOC.js': {
          js: require('docs/src/pages/css-in-js/basics/AdaptingHOC').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/AdaptingHOC'), 'utf8')
`,
        },
        'pages/css-in-js/basics/AdaptingRenderProps.js': {
          js: require('docs/src/pages/css-in-js/basics/AdaptingRenderProps').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/basics/AdaptingRenderProps'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
