import { expect } from 'chai';
import { unstable_nested as nested } from '@mui/private-theming/ThemeProvider';
import createGenerateClassName from './createGenerateClassName';

describe('createGenerateClassName', () => {
  it('should generate a class name', () => {
    const generateClassName = createGenerateClassName();
    expect(
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
    ).to.equal('classNamePrefix-key-1');
  });

  it('should increase the counter', () => {
    const generateClassName = createGenerateClassName();
    expect(
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
    ).to.equal('classNamePrefix-key-1');
    expect(
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
    ).to.equal('classNamePrefix-key-2');
  });

  it('should work without a classNamePrefix', () => {
    const generateClassName = createGenerateClassName();
    expect(
      generateClassName(
        { key: 'root' },
        {
          options: {},
        },
      ),
    ).to.equal('root-1');
  });

  it('should generate global class names', () => {
    const generateClassName = createGenerateClassName();
    expect(
      generateClassName(
        { key: 'root' },
        {
          options: {
            name: 'MuiButton',
            theme: {},
          },
        },
      ),
    ).to.equal('MuiButton-root');
    expect(
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
    ).to.equal('MuiButton-root-1');
    expect(
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
    ).to.equal('MuiButton-root-2');
    expect(
      generateClassName(
        { key: 'disabled' },
        {
          options: {
            name: 'MuiButton',
            theme: {},
          },
        },
      ),
    ).to.equal('Mui-disabled');
  });

  describe('production', () => {
    let nodeEnv;
    const env = process.env;

    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      nodeEnv = env.NODE_ENV;
      env.NODE_ENV = 'production';
    });

    after(() => {
      env.NODE_ENV = nodeEnv;
    });

    it('should output a short representation', () => {
      const generateClassName = createGenerateClassName();
      expect(
        generateClassName(
          { key: 'root' },
          {
            options: {},
          },
        ),
      ).to.equal('jss1');
    });

    it('should use the seed', () => {
      const generateClassName = createGenerateClassName({
        seed: 'dark',
      });
      expect(
        generateClassName(
          { key: 'root' },
          {
            options: {},
          },
        ),
      ).to.equal('dark-jss1');
    });
  });
});
