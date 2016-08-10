/* eslint-env mocha */
import {assert} from 'chai';
import FlatButtonLabel from './FlatButtonLabel';

describe('<FlatButtonLabel />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(FlatButtonLabel.displayName, 'FlatButtonLabel');
  });
});
