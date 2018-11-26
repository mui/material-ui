import { assert } from 'chai';
import withStyles from './withStyles';

describe('withStyles', () => {
  it('does not hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithStyles = withStyles({})(Test);
    assert.strictEqual(TestWithStyles.someStatic, undefined);
  });
});
