const eslint = require('eslint');
const rule = require('./restricted-path-imports');

const ruleTester = new eslint.RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
});
ruleTester.run('restricted-path-imports', rule, {
  valid: [
    "import { Button } from '@material-ui/core'",
    "import Button from '@material-ui/core/Button'",
    "import { withStyles } from '@material-ui/core/styles'",
    "import { blue } from '@material-ui/core/colors'",
    "import * as colors from '@material-ui/core/colors'",
    "import * as colors from '@another/core/styles/withStyles'",
    "import describeConformance from '@material-ui/core/test-utils/describeConformance'",
    "import describeConformance from '@another/core/test-utils/describeConformance'",
  ],
  invalid: [
    {
      code: "import withStyles from '@material-ui/core/styles/withStyles'",
      errors: [
        {
          message:
            "Only second level path imports are allowed. Prefer to import from '@material-ui/core/styles'.",
        },
      ],
    },
    {
      code: "import { capitalize } from '@material-ui/core/utils/helpers'",
      errors: [
        {
          message:
            "Only second level path imports are allowed. Prefer to import from '@material-ui/core/utils'.",
        },
      ],
    },
  ],
});
