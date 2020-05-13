import { expect } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import createGenerateClassName from './createGenerateClassName';
import nested from '../ThemeProvider/nested';

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
