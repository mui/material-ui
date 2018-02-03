import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/themes.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/customization/Palette.js': {
          js: require('docs/src/pages/customization/Palette').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/Palette'), 'utf8')
`,
        },
        'pages/customization/TypographyTheme.js': {
          js: require('docs/src/pages/customization/TypographyTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/TypographyTheme'), 'utf8')
`,
        },
        'pages/customization/FontSizeTheme.js': {
          js: require('docs/src/pages/customization/FontSizeTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/FontSizeTheme'), 'utf8')
`,
        },
        'pages/customization/DarkTheme.js': {
          js: require('docs/src/pages/customization/DarkTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/DarkTheme'), 'utf8')
`,
        },
        'pages/customization/CustomStyles.js': {
          js: require('docs/src/pages/customization/CustomStyles').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/CustomStyles'), 'utf8')
`,
        },
        'pages/customization/OverridesTheme.js': {
          js: require('docs/src/pages/customization/OverridesTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/OverridesTheme'), 'utf8')
`,
        },
        'pages/customization/WithTheme.js': {
          js: require('docs/src/pages/customization/WithTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/WithTheme'), 'utf8')
`,
        },
        'pages/customization/Nested.js': {
          js: require('docs/src/pages/customization/Nested').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/Nested'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
