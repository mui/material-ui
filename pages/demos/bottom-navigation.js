import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./bottom-navigation${props.lang}.md`)}
      demos={{
        'pages/demos/bottom-navigation/SimpleBottomNavigation.js': {
          js: require('docs/src/pages/demos/bottom-navigation/SimpleBottomNavigation').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/bottom-navigation/SimpleBottomNavigation'), 'utf8')
`,
          jsHooks: require('docs/src/pages/demos/bottom-navigation/SimpleBottomNavigation.hooks')
            .default,
          rawHooks: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/bottom-navigation/SimpleBottomNavigation.hooks'), 'utf8')
`,
        },
        'pages/demos/bottom-navigation/LabelBottomNavigation.js': {
          js: require('docs/src/pages/demos/bottom-navigation/LabelBottomNavigation').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/bottom-navigation/LabelBottomNavigation'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
