const eslint = require('eslint');
const path = require('path');
const rule = require('./no-restricted-resolved-imports');

// Get absolute paths for our fixtures
const fixturesDir = path.resolve(__dirname, './__fixtures__/no-restricted-resolved-imports');
const mockPackageDir = path.join(fixturesDir, 'mock-package');
const badFilePath = path.join(mockPackageDir, 'src/components/ButtonGroup/index.js');
const goodFilePath = path.join(mockPackageDir, 'src/components/GoodExample/index.js');

// Create a custom rule tester with the fixture's ESLint configuration
const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: [path.join(mockPackageDir, 'src')],
        moduleDirectory: ['node_modules', path.join(mockPackageDir, 'src')],
      },
    },
  },
});

// ESLint requires the files to actually exist for the resolver to work
// So we're using real files in the test fixtures
ruleTester.run('no-restricted-resolved-imports', rule, {
  valid: [
    // No options provided - rule shouldn't apply
    {
      code: "import { Button } from '../../index';",
      filename: badFilePath,
      options: [],
    },
    // Empty options array - rule shouldn't apply
    {
      code: "import { Button } from '../../index';",
      filename: badFilePath,
      options: [[]],
    },
    // Good example - importing from the component directly
    {
      code: "import Button from '../Button';",
      filename: goodFilePath,
      options: [
        [
          {
            pattern: '*/mock-package/src/index.js',
            message: 'Import the specific module directly instead of from the package index.',
          },
        ],
      ],
    },
  ],
  invalid: [
    // Bad example - importing from the package index
    {
      code: "import { Button } from '../../index';",
      filename: badFilePath,
      options: [
        [
          {
            pattern: '*/mock-package/src/index.js',
            message: 'Import the specific module directly instead of from the package index.',
          },
        ],
      ],
      errors: [
        {
          messageId: 'restrictedResolvedImport',
        },
      ],
    },
  ],
});
