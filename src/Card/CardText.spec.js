/* eslint-env mocha */
import {assert} from 'chai';
import CardText from './CardText';

describe('<CardText />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CardText.displayName, 'CardText');
  });
});
