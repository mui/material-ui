import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/pages/versions/versions.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/versions/LatestVersion.js': {
          js: require('docs/pages/versions/LatestVersion').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/versions/LatestVersion'), 'utf8')
`,
        },
        'pages/versions/StableVersions.js': {
          js: require('docs/pages/versions/StableVersions').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/versions/StableVersions'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
