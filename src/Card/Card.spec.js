/* eslint-env mocha */
import {assert} from 'chai';
import Card from './Card';

describe('<Card />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Card.displayName, 'Card');
  });
});
