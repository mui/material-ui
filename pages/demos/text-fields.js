import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      enableCodeLanguageSwitch
      markdown={req(`./text-fields${props.lang}.md`)}
      demos={{
        'pages/demos/text-fields/TextFields.js': {
          js: require('docs/src/pages/demos/text-fields/TextFields').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/TextFields'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/TextFields.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/FilledTextFields.js': {
          js: require('docs/src/pages/demos/text-fields/FilledTextFields').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/FilledTextFields'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/FilledTextFields.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/OutlinedTextFields.js': {
          js: require('docs/src/pages/demos/text-fields/OutlinedTextFields').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/OutlinedTextFields'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/OutlinedTextFields.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/ComposedTextField.js': {
          js: require('docs/src/pages/demos/text-fields/ComposedTextField').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/ComposedTextField'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/ComposedTextField.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/TextFieldMargins.js': {
          js: require('docs/src/pages/demos/text-fields/TextFieldMargins').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/TextFieldMargins'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/TextFieldMargins.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/InputAdornments.js': {
          js: require('docs/src/pages/demos/text-fields/InputAdornments').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/InputAdornments'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/InputAdornments.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/FilledInputAdornments.js': {
          js: require('docs/src/pages/demos/text-fields/FilledInputAdornments').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/FilledInputAdornments'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/FilledInputAdornments.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/OutlinedInputAdornments.js': {
          js: require('docs/src/pages/demos/text-fields/OutlinedInputAdornments').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/OutlinedInputAdornments'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(
  require.resolve('docs/src/pages/demos/text-fields/OutlinedInputAdornments.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/Inputs.js': {
          js: require('docs/src/pages/demos/text-fields/Inputs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/Inputs'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/Inputs.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/FormattedInputs.js': {
          js: require('docs/src/pages/demos/text-fields/FormattedInputs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/FormattedInputs'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/FormattedInputs.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/CustomizedInputs.js': {
          js: require('docs/src/pages/demos/text-fields/CustomizedInputs').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/CustomizedInputs'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/CustomizedInputs.tsx'), 'utf8')
`,
        },
        'pages/demos/text-fields/InputWithIcon.js': {
          js: require('docs/src/pages/demos/text-fields/InputWithIcon').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/text-fields/InputWithIcon'), 'utf8')
`,
          rawTS: preval`
module.exports = require('fs')
.readFileSync(require.resolve('docs/src/pages/demos/text-fields/InputWithIcon.tsx'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
