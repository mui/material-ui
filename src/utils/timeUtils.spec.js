// @flow weak
/* eslint-env mocha */

import { assert } from 'chai';
import { spy } from 'sinon';
import { formatTime, rad2deg } from './timeUtils';


describe('Time utils', () => {
  it('formatTime', () => {
    const date = new Date();
    date.setMinutes(50);
    date.setHours(11);
    assert.strictEqual(formatTime(undefined), '', 'should be empty');
    assert.strictEqual(formatTime(date, '24hr'), '11:50', 'the formatted data should be 11:50');
    date.setHours(undefined);
    formatTime(date, 'ampm');
  });
  it('rad2deg', () => {
    assert.strictEqual(rad2deg(2), 114.59155902616465);
  });
});
