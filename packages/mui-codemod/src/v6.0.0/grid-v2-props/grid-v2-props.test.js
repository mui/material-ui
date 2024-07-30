import { describeJscodeshiftTransform } from '../../../testUtils';
import transform from './grid-v2-props';

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describeJscodeshiftTransform({
      transform,
      transformName: 'grid-props',
      dirname: __dirname,
      testCases: [
        {
          actual: '/test-cases/actual.js',
          expected: '/test-cases/expected.js',
        },
        {
          actual: '/test-cases/custom-breakpoints.actual.js',
          expected: '/test-cases/custom-breakpoints.expected.js',
          options: { muiBreakpoints: 'customXs,customSm,customMd' },
        },
      ],
    });
  });
});
