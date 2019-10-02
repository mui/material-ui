import boxShadow from './shadows';
import { assert } from 'chai';

describe('shadows', () => {
  it('should support array theme value', () => {
    const output = boxShadow({
      theme: {
        shadows: ['none', '0px 1px 3px 0px rgba(0, 0, 0, 0.2)'],
      },
      boxShadow: 1,
    });

    assert.deepEqual(output, {
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });
  });

  it('should support CSS string value', () => {
    const output = boxShadow({
      theme: {
        shadows: ['none'],
      },
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });

    assert.deepEqual(output, {
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });
  });
});
