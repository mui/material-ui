/* eslint-env mocha */
import {assert} from 'chai';
import RenderToLayer from './RenderToLayer';

describe('<RenderToLayer />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(RenderToLayer.displayName, 'RenderToLayer');
  });
});
