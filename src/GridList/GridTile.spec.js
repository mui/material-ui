/* eslint-env mocha */
import {assert} from 'chai';
import GridTile from './GridTile';

describe('<GridTile />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(GridTile.displayName, 'GridTile');
  });
});
