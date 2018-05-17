import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/versions/versions.md';

function Page() {
  return (
    <MarkdownDocs
      disableCarbon
      markdown={markdown}
      demos={{
        'pages/versions/LatestVersion.js': {
          js: require('docs/src/pages/versions/LatestVersion').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/versions/LatestVersion'), 'utf8')
`,
        },
        'pages/versions/StableVersions.js': {
          js: require('docs/src/pages/versions/StableVersions').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/versions/StableVersions'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
