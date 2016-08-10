/* eslint-env mocha */
import {assert} from 'chai';
import Tab from './Tab';

describe('<Tab />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Tab.displayName, 'Tab');
  });
});
