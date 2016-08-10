/* eslint-env mocha */
import {assert} from 'chai';
import SelectField from './SelectField';

describe('<SelectField />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(SelectField.displayName, 'SelectField');
  });
});
