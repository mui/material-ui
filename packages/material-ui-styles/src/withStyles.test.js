import { assert } from 'chai';
import React from 'react';
import { Input } from '@material-ui/core';
import { isMuiElement } from '@material-ui/core/utils/reactHelpers';
import withStyles from './withStyles';

describe('withStyles', () => {
  it('does not hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithStyles = withStyles({})(Test);
    assert.strictEqual(TestWithStyles.someStatic, undefined);
  });

  it('hoists mui internals', () => {
    assert.strictEqual(isMuiElement(<Input />, ['Input']), true);

    // the imported Input is decorated with @material-ui/core/styles
    const StyledInput = withStyles({})(Input);

    assert.strictEqual(isMuiElement(<StyledInput />, ['Input']), true);
  });
});
