/* eslint-env mocha */
import {assert} from 'chai';
import CardHeader from './CardHeader';

describe('<CardHeader />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CardHeader.displayName, 'CardHeader');
  });
});
