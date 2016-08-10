/* eslint-env mocha */
import {assert} from 'chai';
import CardActions from './CardActions';

describe('<CardActions />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CardActions.displayName, 'CardActions');
  });
});
