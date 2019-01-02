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

  it('should increase the counter only when needed', () => {
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
    assert.strictEqual(
      generateClassName(
        {
          key: 'key',
        },
        {
          rules: {
            raw: {
              key: () => ({}),
            },
          },
          options: {
            link: true,
            theme: {},
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key-1',
    );
    assert.strictEqual(
      generateClassName(
        {
          key: 'key',
        },
        {
          rules: {
            raw: {
              key: () => ({}),
            },
          },
          options: {
            link: true,
            theme: {},
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key-2',
    );
  });

  it('should use the theme object, rule key and the style raw', () => {
    assert.strictEqual(
      generateClassName(
        {
          key: 'key1',
        },
        {
          rules: {
            raw: {
              key1: {
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
      'classNamePrefix-key1-1s3krrz',
    );
    assert.strictEqual(
      generateClassName(
        {
          key: 'key2',
        },
        {
          rules: {
            raw: {
              key2: {
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
      'classNamePrefix-key2-l5j9wx',
    );
    assert.strictEqual(
      generateClassName(
        {
          key: 'key2',
        },
        {
          rules: {
            raw: {
              key2: {
                flex: 2,
              },
            },
          },
          options: {
            theme: {},
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key2-1q3ldtd',
    );
    assert.strictEqual(
      generateClassName(
        {
          key: 'key2',
        },
        {
          rules: {
            raw: {
              key2: {
                flex: 2,
              },
            },
          },
          options: {
            theme: {
              spacing: 4,
            },
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key2-b6l15m',
    );
  });
});
