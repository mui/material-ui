import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/steppers/steppers.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/steppers/HorizontalLinearAlternativeLabelStepper.js': {
          js: require('docs/src/pages/demos/steppers/HorizontalLinearAlternativeLabelStepper')
            .default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/steppers/HorizontalLinearAlternativeLabelStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/HorizontalLinearStepper.js': {
          js: require('docs/src/pages/demos/steppers/HorizontalLinearStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/steppers/HorizontalLinearStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/HorizontalNonLinearAlternativeLabelStepper.js': {
          js: require('docs/src/pages/demos/steppers/HorizontalNonLinearAlternativeLabelStepper')
            .default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/steppers/HorizontalNonLinearAlternativeLabelStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/HorizontalNonLinearStepper.js': {
          js: require('docs/src/pages/demos/steppers/HorizontalNonLinearStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/steppers/HorizontalNonLinearStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/VerticalLinearStepper.js': {
          js: require('docs/src/pages/demos/steppers/VerticalLinearStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/steppers/VerticalLinearStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/TextMobileStepper.js': {
          js: require('docs/src/pages/demos/steppers/TextMobileStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/steppers/TextMobileStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/DotsMobileStepper.js': {
          js: require('docs/src/pages/demos/steppers/DotsMobileStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/steppers/DotsMobileStepper'), 'utf8')
`,
        },
        'pages/demos/steppers/ProgressMobileStepper.js': {
          js: require('docs/src/pages/demos/steppers/ProgressMobileStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/steppers/ProgressMobileStepper'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
