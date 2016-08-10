/* eslint-env mocha */
import {assert} from 'chai';
import CardMedia from './CardMedia';

describe('<CardMedia />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CardMedia.displayName, 'CardMedia');
  });
});
