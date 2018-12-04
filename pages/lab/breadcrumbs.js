import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./breadcrumbs${props.lang}.md`)}
      demos={{
        'pages/lab/breadcrumbs/SimpleBreadcrumbs.js': {
          js: require('docs/src/pages/lab/breadcrumbs/SimpleBreadcrumbs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/breadcrumbs/SimpleBreadcrumbs'), 'utf8')
`,
        },
        'pages/lab/breadcrumbs/CustomSeparatorText.js': {
          js: require('docs/src/pages/lab/breadcrumbs/CustomSeparatorText').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/breadcrumbs/CustomSeparatorText'), 'utf8')
`,
        },
        'pages/lab/breadcrumbs/CustomSeparatorComponent.js': {
          js: require('docs/src/pages/lab/breadcrumbs/CustomSeparatorComponent').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/breadcrumbs/CustomSeparatorComponent'), 'utf8')
`,
        },
        'pages/lab/breadcrumbs/IconBreadcrumbs.js': {
          js: require('docs/src/pages/lab/breadcrumbs/IconBreadcrumbs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/breadcrumbs/IconBreadcrumbs'), 'utf8')
`,
        },
        'pages/lab/breadcrumbs/CollapsedBreadcrumbs.js': {
          js: require('docs/src/pages/lab/breadcrumbs/CollapsedBreadcrumbs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/breadcrumbs/CollapsedBreadcrumbs'), 'utf8')
`,
        },
        'pages/lab/breadcrumbs/StyledBreadcrumbs.js': {
          js: require('docs/src/pages/lab/breadcrumbs/StyledBreadcrumbs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/breadcrumbs/StyledBreadcrumbs'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
