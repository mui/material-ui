import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/customization/themes/themes.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/customization/themes/Palette.js': {
          js: require('docs/src/pages/customization/themes/Palette').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/Palette'), 'utf8')
`,
        },
        'pages/customization/themes/TypographyTheme.js': {
          js: require('docs/src/pages/customization/themes/TypographyTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/TypographyTheme'), 'utf8')
`,
        },
        'pages/customization/themes/FontSizeTheme.js': {
          js: require('docs/src/pages/customization/themes/FontSizeTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/FontSizeTheme'), 'utf8')
`,
        },
        'pages/customization/themes/DarkTheme.js': {
          js: require('docs/src/pages/customization/themes/DarkTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/DarkTheme'), 'utf8')
`,
        },
        'pages/customization/themes/CustomStyles.js': {
          js: require('docs/src/pages/customization/themes/CustomStyles').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/CustomStyles'), 'utf8')
`,
        },
        'pages/customization/themes/OverridesCss.js': {
          js: require('docs/src/pages/customization/themes/OverridesCss').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/OverridesCss'), 'utf8')
`,
        },
        'pages/customization/themes/OverridesProperties.js': {
          js: require('docs/src/pages/customization/themes/OverridesProperties').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/OverridesProperties'), 'utf8')
`,
        },
        'pages/customization/themes/WithTheme.js': {
          js: require('docs/src/pages/customization/themes/WithTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/WithTheme'), 'utf8')
`,
        },
        'pages/customization/themes/Nested.js': {
          js: require('docs/src/pages/customization/themes/Nested').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/Nested'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
