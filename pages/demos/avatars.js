import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./avatars${props.lang}.md`)}
      demos={{
        'pages/demos/avatars/ImageAvatars.js': {
          js: require('docs/src/pages/demos/avatars/ImageAvatars').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/avatars/ImageAvatars'), 'utf8')
`,
        },
        'pages/demos/avatars/IconAvatars.js': {
          js: require('docs/src/pages/demos/avatars/IconAvatars').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/avatars/IconAvatars'), 'utf8')
`,
        },
        'pages/demos/avatars/LetterAvatars.js': {
          js: require('docs/src/pages/demos/avatars/LetterAvatars').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/avatars/LetterAvatars'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;
