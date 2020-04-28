import { expect } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import createGenerateClassNameHash from './createGenerateClassNameHash';

describe('createGenerateClassNameHash', () => {
  const generateClassName = createGenerateClassNameHash();
  const generateClassNameGlobal = createGenerateClassNameHash({ dangerouslyUseGlobalCSS: true });

  describe('dangerouslyUseGlobalCSS', () => {
    it('should have a stable classname', () => {
      expect(
        generateClassNameGlobal(
          {
            key: 'key',
          },
          {
            options: {
              name: 'MuiGrid',
            },
          },
        ),
      ).to.equal('MuiGrid-key');
      expect(
        generateClassNameGlobal(
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
              classNamePrefix: 'classNamePrefix',
            },
          },
        ),
      ).to.equal('classNamePrefix-key-1');
    });
  });

  it('should generate a class name', () => {
    expect(
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
    ).to.equal('classNamePrefix-key-1mx1qso');
  });

  it('should increase the counter only when needed', () => {
    expect(
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
    ).to.equal('classNamePrefix-key-1mx1qso');
    expect(
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
          rules: {
            raw: {
              key: () => ({}),
            },
          },
          options: {
            link: true,
            classNamePrefix: 'classNamePrefix',
          },
        },
      ),
    ).to.equal('classNamePrefix-key-2');
  });

  it('should use the theme object, rule key and the style raw', () => {
    expect(
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
    ).to.equal('classNamePrefix-key1-1s3krrz');
    expect(
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
    ).to.equal('classNamePrefix-key2-l5j9wx');
    expect(
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
    ).to.equal('classNamePrefix-key2-1q3ldtd');
    expect(
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
    ).to.equal('classNamePrefix-key2-b6l15m');
  });

  describe('classNamePrefix', () => {
    it('should work without a classNamePrefix', () => {
      const rule = { key: 'root' };
      const styleSheet = {
        rules: { raw: {} },
        options: {},
      };
      const generateClassName2 = createGenerateClassNameHash();
      expect(generateClassName2(rule, styleSheet)).to.equal('root-11u5x61');
    });
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
      const styleSheet = {
        rules: { raw: {} },
        options: {},
      };
      const generateClassName2 = createGenerateClassNameHash();
      expect(generateClassName2(rule, styleSheet)).to.equal('jss11u5x61');
    });
  });
});
