/* eslint-env mocha */
import {assert} from 'chai';
import Tabs from './Tabs';

describe('<Tabs />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Tabs.displayName, 'Tabs');
  });
});
