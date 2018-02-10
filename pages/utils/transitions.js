import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/transitions/transitions.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/transitions/SimpleCollapse.js': {
          js: require('docs/src/pages/utils/transitions/SimpleCollapse').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/transitions/SimpleCollapse'), 'utf8')`,
        },
        'pages/utils/transitions/SimpleFade.js': {
          js: require('docs/src/pages/utils/transitions/SimpleFade').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/transitions/SimpleFade'), 'utf8')`,
        },
        'pages/utils/transitions/SimpleGrow.js': {
          js: require('docs/src/pages/utils/transitions/SimpleGrow').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/transitions/SimpleGrow'), 'utf8')`,
        },
        'pages/utils/transitions/SimpleSlide.js': {
          js: require('docs/src/pages/utils/transitions/SimpleSlide').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/transitions/SimpleSlide'), 'utf8')`,
        },
        'pages/utils/transitions/SimpleZoom.js': {
          js: require('docs/src/pages/utils/transitions/SimpleZoom').default,
          raw: preval`module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/transitions/SimpleZoom'), 'utf8')`,
        },
      }}
    />
  );
}

export default withRoot(Page);
