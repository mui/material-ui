import { assert } from 'chai';
import createGenerateClassName from './createGenerateClassName';

describe('createGenerateClassName', () => {
  const generateClassName = createGenerateClassName();

  it('should generate a class name', () => {
    assert.strictEqual(
      generateClassName(
        { key: 'key' },
        {
          options: {
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key-1',
    );
  });
});
