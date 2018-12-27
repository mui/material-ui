import { assert } from 'chai';
import createGenerateClassName from './createGenerateClassName';

describe('createGenerateClassName', () => {
  const generateClassName = createGenerateClassName();

  it('should generate a class name', () => {
    assert.strictEqual(
      generateClassName(
        {
          key: 'key',
        },
        {
          rules: {
            raw: {
              key: {
                flex: 1,
              },
            },
          },
          options: {
            theme: {},
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key-1mx1qso',
    );
  });
});
