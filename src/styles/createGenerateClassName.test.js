import { assert } from 'chai';
import createGenerateClassName from './createGenerateClassName';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

describe('createGenerateClassName', () => {
  describe('counter', () => {
    it('should increment a scoped counter', () => {
      const rule = { key: 'root' };
      const generateClassName1 = createGenerateClassName();
      assert.strictEqual(generateClassName1(rule), 'root-1');
      assert.strictEqual(generateClassName1(rule), 'root-2');
      const generateClassName2 = createGenerateClassName();
      assert.strictEqual(generateClassName2(rule), 'root-1');
    });
  });

  it('should escape parenthesis', () => {
    const generateClassName = createGenerateClassName();
    assert.strictEqual(
      generateClassName(
        { key: 'root' },
        {
          options: {
            classNamePrefix: 'pure(MuiButton)',
            jss: {},
          },
        },
      ),
      'pure-MuiButton--root-1',
    );
  });

  it('should escape spaces', () => {
    const generateClassName = createGenerateClassName();
    assert.strictEqual(
      generateClassName(
        { key: 'root' },
        {
          options: {
            classNamePrefix: 'foo bar',
            jss: {},
          },
        },
      ),
      'foo-bar-root-1',
    );
  });

  describe('options: dangerouslyUseGlobalCSS', () => {
    it('should use a global class name', () => {
      const generateClassName = createGenerateClassName({
        dangerouslyUseGlobalCSS: true,
      });
      assert.strictEqual(
        generateClassName(
          {
            key: 'root',
          },
          {
            options: {
              classNamePrefix: 'MuiButton',
              jss: {},
            },
          },
        ),
        'MuiButton-root',
      );
      assert.strictEqual(
        generateClassName(
          {
            key: 'root',
          },
          {
            options: {
              classNamePrefix: 'Button',
              jss: {},
            },
          },
        ),
        'Button-root-2',
      );
    });

    it('should default to a non deterministic name', () => {
      const generateClassName = createGenerateClassName({
        dangerouslyUseGlobalCSS: true,
      });
      assert.strictEqual(
        generateClassName({
          key: 'root',
        }),
        'root-1',
      );
    });
  });

  describe('formatting', () => {
    it('should take the sheet meta in development if available', () => {
      const rule = { key: 'root' };
      const styleSheet = { options: { classNamePrefix: 'Button' } };
      const generateClassName = createGenerateClassName();
      assert.strictEqual(generateClassName(rule, styleSheet), 'Button-root-1');
    });

    it('should use a base 10 representation', () => {
      const rule = { key: 'root' };
      const generateClassName = createGenerateClassName();
      assert.strictEqual(generateClassName(rule), 'root-1');
      assert.strictEqual(generateClassName(rule), 'root-2');
      assert.strictEqual(generateClassName(rule), 'root-3');
      assert.strictEqual(generateClassName(rule), 'root-4');
      assert.strictEqual(generateClassName(rule), 'root-5');
      assert.strictEqual(generateClassName(rule), 'root-6');
      assert.strictEqual(generateClassName(rule), 'root-7');
      assert.strictEqual(generateClassName(rule), 'root-8');
      assert.strictEqual(generateClassName(rule), 'root-9');
      assert.strictEqual(generateClassName(rule), 'root-10');
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
        const rule = { key: 'root' };
        const generateClassName = createGenerateClassName();
        assert.strictEqual(generateClassName(rule), 'jss1');
      });

      it('should work with global CSS', () => {
        const rule = { key: 'root' };
        const generateClassName = createGenerateClassName({
          dangerouslyUseGlobalCSS: true,
        });
        assert.strictEqual(generateClassName(rule), 'jss1');
      });

      it('should warn', () => {
        createGenerateClassName();
        createGenerateClassName();
        assert.strictEqual(consoleErrorMock.callCount() > 0, true);
        assert.match(
          consoleErrorMock.args()[0][0],
          /Material-UI: we have detected more than needed creation of the/,
        );
      });
    });
  });
});
