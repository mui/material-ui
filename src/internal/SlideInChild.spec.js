/* eslint-env mocha */
import {assert} from 'chai';
import SlideInChild from './SlideInChild';

describe('<SlideInChild />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(SlideInChild.displayName, 'SlideInChild');
  });
});
