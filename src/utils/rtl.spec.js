/* eslint-env mocha */

import rtl from './rtl';
import {assert} from 'chai';

describe('./utils/rtl', () => {
  it('should ignore the style if directionInvariant is true', () => {
    const actual = rtl({
      isRtl: true,
    })({
      directionInvariant: true,
      right: 10,
    });

    assert.deepEqual(actual, {
      directionInvariant: true,
      right: 10,
    });
  });
});
