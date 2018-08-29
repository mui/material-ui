import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/lab/slider/slider.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/lab/slider/SimpleSlider.js': {
          js: require('docs/src/pages/lab/slider/SimpleSlider').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/slider/SimpleSlider'), 'utf8')
`,
        },
        'pages/lab/slider/StepSlider.js': {
          js: require('docs/src/pages/lab/slider/StepSlider').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/slider/StepSlider'), 'utf8')
`,
        },
        'pages/lab/slider/DisabledSlider.js': {
          js: require('docs/src/pages/lab/slider/DisabledSlider').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/slider/DisabledSlider'), 'utf8')
`,
        },
        'pages/lab/slider/VerticalSlider.js': {
          js: require('docs/src/pages/lab/slider/VerticalSlider').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/slider/VerticalSlider'), 'utf8')
`,
        },
        'pages/lab/slider/ReverseSlider.js': {
          js: require('docs/src/pages/lab/slider/ReverseSlider').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/slider/ReverseSlider'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
