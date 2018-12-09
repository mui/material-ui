import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./versions${props.lang}.md`)}
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
