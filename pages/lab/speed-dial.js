import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./speed-dial${props.lang}.md`)}
      demos={{
        'pages/lab/speed-dial/SpeedDials.js': {
          js: require('docs/src/pages/lab/speed-dial/SpeedDials').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/speed-dial/SpeedDials'), 'utf8')
`,
        },
        'pages/lab/speed-dial/OpenIconSpeedDial.js': {
          js: require('docs/src/pages/lab/speed-dial/OpenIconSpeedDial').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/speed-dial/OpenIconSpeedDial'), 'utf8')
`,
        },
        'pages/lab/speed-dial/SpeedDialTooltipOpen.js': {
          js: require('docs/src/pages/lab/speed-dial/SpeedDialTooltipOpen').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/speed-dial/SpeedDialTooltipOpen'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
