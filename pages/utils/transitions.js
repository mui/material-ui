import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/transitions.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/SimpleCollapse.js': {
          js: require('docs/src/pages/utils/SimpleCollapse').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/SimpleCollapse'), 'utf8')`,
        },
        'pages/utils/SimpleFade.js': {
          js: require('docs/src/pages/utils/SimpleFade').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/SimpleFade'), 'utf8')`,
        },
        'pages/utils/SimpleGrow.js': {
          js: require('docs/src/pages/utils/SimpleGrow').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/SimpleGrow'), 'utf8')`,
        },
        'pages/utils/SimpleSlide.js': {
          js: require('docs/src/pages/utils/SimpleSlide').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/SimpleSlide'), 'utf8')`,
        },
        'pages/utils/SimpleZoom.js': {
          js: require('docs/src/pages/utils/SimpleZoom').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/SimpleZoom'), 'utf8')`,
        },
      }}
    />
  );
}

export default withRoot(Page);
