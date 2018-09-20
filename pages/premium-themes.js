import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/premium-themes/premium-themes.md';

function Page() {
  return (
    <MarkdownDocs
      disableAd
      markdown={markdown}
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
