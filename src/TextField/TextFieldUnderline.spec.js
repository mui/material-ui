/* eslint-env mocha */
import {assert} from 'chai';
import TextFieldUnderline from './TextFieldUnderline';

describe('<TextFieldUnderline />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TextFieldUnderline.displayName, 'TextFieldUnderline');
  });
});
