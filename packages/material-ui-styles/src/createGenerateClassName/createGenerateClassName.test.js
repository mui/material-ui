import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import createGenerateClassName from './createGenerateClassName';
import nested from '../ThemeProvider/nested';

describe('createGenerateClassName', () => {
  it('should generate a class name', () => {
    const generateClassName = createGenerateClassName();
    assert.strictEqual(
      generateClassName(
        {
          key: 'key',
        },
        {
          options: {
            theme: {},
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key-1',
    );
  });

  it('should increase the counter', () => {
    const generateClassName = createGenerateClassName();
    assert.strictEqual(
      generateClassName(
        {
          key: 'key',
        },
        {
          options: {
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
          options: {
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
      'classNamePrefix-key-2',
    );
  });

  it('should work without a classNamePrefix', () => {
    const generateClassName = createGenerateClassName();
    assert.strictEqual(
      generateClassName(
        { key: 'root' },
        {
          options: {},
        },
      ),
      'root-1',
    );
  });

  it('should generate global class names', () => {
    const generateClassName = createGenerateClassName();
    assert.strictEqual(
      generateClassName(
        { key: 'root' },
        {
          options: {
            name: 'MuiButton',
            theme: {},
          },
        },
      ),
      'MuiButton-root',
    );
    assert.strictEqual(
      generateClassName(
        { key: 'root' },
        {
          options: {
            name: 'MuiButton',
            theme: {
              [nested]: true,
            },
          },
        },
      ),
      'MuiButton-root-2',
    );
    assert.strictEqual(
      generateClassName(
        { key: 'disabled' },
        {
          options: {
            name: 'MuiButton',
            theme: {},
          },
        },
      ),
      'Mui-disabled',
    );
  });

  describe('production', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    let nodeEnv;
    const env = process.env;

    before(() => {
      nodeEnv = env.NODE_ENV;
      env.NODE_ENV = 'production';
      consoleErrorMock.spy();
    });

    after(() => {
      env.NODE_ENV = nodeEnv;
      consoleErrorMock.reset();
    });

    it('should output a short representation', () => {
      const generateClassName = createGenerateClassName();
      assert.strictEqual(
        generateClassName(
          { key: 'root' },
          {
            options: {},
          },
        ),
        'jss1',
      );
    });

    it('should use the seed', () => {
      const generateClassName = createGenerateClassName({
        seed: 'dark',
      });
      assert.strictEqual(
        generateClassName(
          { key: 'root' },
          {
            options: {},
          },
        ),
        'dark-jss1',
      );
    });
  });
});
