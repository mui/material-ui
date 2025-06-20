import { describeJscodeshiftTransform } from '../../../testUtils';
import transform from './theme-alpha';

describe('@mui/codemod', () => {
  describe('v7.0.0', () => {
    describeJscodeshiftTransform({
      transform,
      transformName: 'theme-alpha',
      dirname: __dirname,
      testCases: [
        {
          actual: '/test-cases/actual.js',
          expected: '/test-cases/expected.js',
        },
        {
          actual: '/test-cases/opacity-var.actual.js',
          expected: '/test-cases/opacity-var.expected.js',
        },
        {
          actual: '/test-cases/opacity-calc.actual.js',
          expected: '/test-cases/opacity-calc.expected.js',
        },
      ],
    });
  });
});
