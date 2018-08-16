import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/cards/cards.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/cards/SimpleCard.js': {
          js: require('docs/src/pages/demos/cards/SimpleCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/cards/SimpleCard'), 'utf8')
`,
        },
        'pages/demos/cards/MediaCard.js': {
          js: require('docs/src/pages/demos/cards/MediaCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/cards/MediaCard'), 'utf8')
`,
        },
        'pages/demos/cards/ImgMediaCard.js': {
          js: require('docs/src/pages/demos/cards/ImgMediaCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/cards/ImgMediaCard'), 'utf8')
`,
        },
        'pages/demos/cards/MediaControlCard.js': {
          js: require('docs/src/pages/demos/cards/MediaControlCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/cards/MediaControlCard'), 'utf8')
`,
        },
        'pages/demos/cards/RecipeReviewCard.js': {
          js: require('docs/src/pages/demos/cards/RecipeReviewCard').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/cards/RecipeReviewCard'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
