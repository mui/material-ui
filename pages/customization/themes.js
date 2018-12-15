import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /\.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./themes${props.lang}.md`)}
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
        'pages/customization/themes/ThemeNesting.js': {
          js: require('docs/src/pages/customization/themes/ThemeNesting').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/ThemeNesting'), 'utf8')
`,
        },
        'pages/customization/themes/ThemeNestingExtend.js': {
          js: require('docs/src/pages/customization/themes/ThemeNestingExtend').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/customization/themes/ThemeNestingExtend'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
