import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/pages/demos/avatars/avatars.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/avatars/ImageAvatars.js': {
          js: require('docs/pages/demos/avatars/ImageAvatars').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/avatars/ImageAvatars'), 'utf8')
`,
        },
        'pages/demos/avatars/IconAvatars.js': {
          js: require('docs/pages/demos/avatars/IconAvatars').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/avatars/IconAvatars'), 'utf8')
`,
        },
        'pages/demos/avatars/LetterAvatars.js': {
          js: require('docs/pages/demos/avatars/LetterAvatars').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/avatars/LetterAvatars'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
