/* eslint-env mocha */
import {assert} from 'chai';
import SlideIn from './SlideIn';

describe('<SlideIn />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(SlideIn.displayName, 'SlideIn');
  });
});
