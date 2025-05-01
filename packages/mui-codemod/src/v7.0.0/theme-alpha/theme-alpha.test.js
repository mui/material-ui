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
      ],
    });
  });
});
