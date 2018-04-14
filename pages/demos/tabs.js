import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/tabs/tabs.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/tabs/SimpleTabs.js': {
          js: require('docs/src/pages/demos/tabs/SimpleTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/SimpleTabs'), 'utf8')
`,
        },
        'pages/demos/tabs/TabsWrappedLabel.js': {
          js: require('docs/src/pages/demos/tabs/TabsWrappedLabel').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/TabsWrappedLabel'), 'utf8')
`,
        },
        'pages/demos/tabs/FullWidthTabs.js': {
          js: require('docs/src/pages/demos/tabs/FullWidthTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/FullWidthTabs'), 'utf8')
`,
        },
        'pages/demos/tabs/CenteredTabs.js': {
          js: require('docs/src/pages/demos/tabs/CenteredTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/CenteredTabs'), 'utf8')
`,
        },
        'pages/demos/tabs/ScrollableTabsButtonAuto.js': {
          js: require('docs/src/pages/demos/tabs/ScrollableTabsButtonAuto').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/ScrollableTabsButtonAuto'), 'utf8')
`,
        },
        'pages/demos/tabs/ScrollableTabsButtonForce.js': {
          js: require('docs/src/pages/demos/tabs/ScrollableTabsButtonForce').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/ScrollableTabsButtonForce'), 'utf8')
`,
        },
        'pages/demos/tabs/ScrollableTabsButtonPrevent.js': {
          js: require('docs/src/pages/demos/tabs/ScrollableTabsButtonPrevent').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/ScrollableTabsButtonPrevent'), 'utf8')
`,
        },
        'pages/demos/tabs/IconTabs.js': {
          js: require('docs/src/pages/demos/tabs/IconTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/IconTabs'), 'utf8')
`,
        },
        'pages/demos/tabs/IconLabelTabs.js': {
          js: require('docs/src/pages/demos/tabs/IconLabelTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/IconLabelTabs'), 'utf8')
`,
        },
        'pages/demos/tabs/DisabledTabs.js': {
          js: require('docs/src/pages/demos/tabs/DisabledTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/DisabledTabs'), 'utf8')
`,
        },
        'pages/demos/tabs/CustomizedTabs.js': {
          js: require('docs/src/pages/demos/tabs/CustomizedTabs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/tabs/CustomizedTabs'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
