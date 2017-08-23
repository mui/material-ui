// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/overrides.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/customization/OverridesClassNames.js': {
          js: require('docs/src/pages/customization/OverridesClassNames').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/OverridesClassNames'), 'utf8')
`,
        },
        'pages/customization/OverridesClasses.js': {
          js: require('docs/src/pages/customization/OverridesClasses').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/OverridesClasses'), 'utf8')
`,
        },
        'pages/customization/OverridesInlineStyle.js': {
          js: require('docs/src/pages/customization/OverridesInlineStyle').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/OverridesInlineStyle'), 'utf8')
`,
        },
        'pages/customization/OverridesComponent.js': {
          js: require('docs/src/pages/customization/OverridesComponent').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/OverridesComponent'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
