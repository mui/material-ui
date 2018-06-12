/* eslint-disable max-len */

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/overrides/overrides.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/customization/overrides/ClassNames.js': {
          js: require('docs/src/pages/customization/overrides/ClassNames').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/ClassNames'), 'utf8')
`,
        },
        'pages/customization/overrides/ClassesNesting.js': {
          js: require('docs/src/pages/customization/overrides/ClassesNesting').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/ClassesNesting'), 'utf8')
`,
        },
        'pages/customization/overrides/ClassesState.js': {
          js: require('docs/src/pages/customization/overrides/ClassesState').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/ClassesState'), 'utf8')
`,
        },
        'pages/customization/overrides/InlineStyle.js': {
          js: require('docs/src/pages/customization/overrides/InlineStyle').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/InlineStyle'), 'utf8')
`,
        },
        'pages/customization/overrides/DynamicClassName.js': {
          js: require('docs/src/pages/customization/overrides/DynamicClassName').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/DynamicClassName'), 'utf8')
`,
        },
        'pages/customization/overrides/DynamicCSSVariables.js': {
          js: require('docs/src/pages/customization/overrides/DynamicCSSVariables').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/DynamicCSSVariables'), 'utf8')
`,
        },
        'pages/customization/overrides/DynamicThemeNesting.js': {
          js: require('docs/src/pages/customization/overrides/DynamicThemeNesting').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/DynamicThemeNesting'), 'utf8')
`,
        },
        'pages/customization/overrides/DynamicInlineStyle.js': {
          js: require('docs/src/pages/customization/overrides/DynamicInlineStyle').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/DynamicInlineStyle'), 'utf8')
`,
        },
        'pages/customization/overrides/Component.js': {
          js: require('docs/src/pages/customization/overrides/Component').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/overrides/Component'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
