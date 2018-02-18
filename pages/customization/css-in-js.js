import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/css-in-js/css-in-js.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
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
