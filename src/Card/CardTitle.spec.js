/* eslint-env mocha */
import {assert} from 'chai';
import CardTitle from './CardTitle';

describe('<CardTitle />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CardTitle.displayName, 'CardTitle');
  });
});
