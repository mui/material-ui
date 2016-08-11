/* eslint-env mocha */
import {assert} from 'chai';
import TabTemplate from './TabTemplate';

describe('<TabTemplate />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TabTemplate.displayName, 'TabTemplate');
  });
});
