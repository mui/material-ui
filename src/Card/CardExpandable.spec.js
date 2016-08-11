/* eslint-env mocha */
import {assert} from 'chai';
import CardExpandable from './CardExpandable';

describe('<CardExpandable />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CardExpandable.displayName, 'CardExpandable');
  });
});
