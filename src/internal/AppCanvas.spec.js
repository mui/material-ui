/* eslint-env mocha */
import {assert} from 'chai';
import AppCanvas from './AppCanvas';

describe('<AppCanvas />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(AppCanvas.displayName, 'AppCanvas');
  });
});
