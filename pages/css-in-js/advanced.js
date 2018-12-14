import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./advanced${props.lang}.md`)}
      demos={{
        'pages/css-in-js/advanced/Theming.js': {
          js: require('docs/src/pages/css-in-js/advanced/Theming').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/advanced/Theming'), 'utf8')
`,
        },
        'pages/css-in-js/advanced/UseTheme.js': {
          js: require('docs/src/pages/css-in-js/advanced/UseTheme').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/advanced/UseTheme'), 'utf8')
`,
        },
        'pages/css-in-js/advanced/WithTheme.js': {
          js: require('docs/src/pages/css-in-js/advanced/WithTheme').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/advanced/WithTheme'), 'utf8')
`,
        },
        'pages/css-in-js/advanced/ThemeNesting.js': {
          js: require('docs/src/pages/css-in-js/advanced/ThemeNesting').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/advanced/ThemeNesting'), 'utf8')
`,
        },
        'pages/css-in-js/advanced/StringTemplates.js': {
          js: require('docs/src/pages/css-in-js/advanced/StringTemplates').default,
          raw: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/css-in-js/advanced/StringTemplates'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
