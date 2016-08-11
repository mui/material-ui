/* eslint-env mocha */
import {assert} from 'chai';
import TextFieldHint from './TextFieldHint';

describe('<TextFieldHint />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TextFieldHint.displayName, 'TextFieldHint');
  });
});
