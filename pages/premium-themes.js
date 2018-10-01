import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      disableAd
      markdown={req(`./premium-themes-${props.lang}.md`)}
      demos={{
        'pages/premium-themes/PremiumThemes.js': {
          js: require('docs/src/pages/premium-themes/PremiumThemes').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/premium-themes/PremiumThemes'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
