/* eslint-env mocha */
import {assert} from 'chai';
import BeforeAfterWrapper from './BeforeAfterWrapper';

describe('<BeforeAfterWrapper />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(BeforeAfterWrapper.displayName, 'BeforeAfterWrapper');
  });
});
