import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./css-in-js${props.lang}.md`)}
      demos={{
        'pages/customization/css-in-js/CssInJs.js': {
          js: require('docs/src/pages/customization/css-in-js/CssInJs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/css-in-js/CssInJs'), 'utf8')
`,
        },
        'pages/customization/css-in-js/JssRegistry.js': {
          js: require('docs/src/pages/customization/css-in-js/JssRegistry').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/css-in-js/JssRegistry'), 'utf8')
`,
        },
        'pages/customization/css-in-js/StyledComponents.js': {
          js: require('docs/src/pages/customization/css-in-js/StyledComponents').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/css-in-js/StyledComponents'), 'utf8')
`,
        },
        'pages/customization/css-in-js/RenderProps.js': {
          js: require('docs/src/pages/customization/css-in-js/RenderProps').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/css-in-js/RenderProps'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
