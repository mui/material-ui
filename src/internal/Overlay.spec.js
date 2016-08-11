/* eslint-env mocha */
import {assert} from 'chai';
import Overlay from './Overlay';

describe('<Overlay />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Overlay.displayName, 'Overlay');
  });
});
