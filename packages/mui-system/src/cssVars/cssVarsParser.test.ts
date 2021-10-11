import { expect } from 'chai';
import { assignNestedKeys, walkObjectDeep, createCssVarsParser } from './cssVarsParser';

describe('cssVarsParser', () => {
  describe('assignNestedKeys', () => {
    it('does not account for null, undefined, non-object', () => {
      let result;
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal(undefined);

      result = null;
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal(null);

      result = '';
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal('');
    });

    it('build object with keys and value', () => {
      const result = {};
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal({
        a: {
          b: {
            c: 'd',
          },
        },
      });
    });

    it('does not override existing fields', () => {
      const result = {
        a: {
          b: {
            existed: true,
          },
        },
      };
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal({
        a: {
          b: {
            existed: true,
            c: 'd',
          },
        },
      });
    });
  });
  describe('walkObjectDeep', () => {
    it('run callback at each key', () => {
      const result: Record<string, boolean> = {};
      walkObjectDeep<boolean>(
        {
          lv1: {
            lv2: {
              lv3: {
                yes: true,
                no: false,
              },
            },
          },
        },
        (keys, value) => {
          result[keys.join('-')] = value;
        },
      );
      expect(result).to.deep.equal({
        'lv1-lv2-lv3-yes': true,
        'lv1-lv2-lv3-no': false,
      });
    });

    it('does not throw value is null', () => {
      const result: Record<string, boolean> = {};
      walkObjectDeep<boolean>(
        {
          lv1: null,
        },
        (keys, value) => {
          result[keys.join('-')] = value;
        },
      );
      expect(result).to.deep.equal({});
    });
  });

  describe('createCssVarsParser', () => {
    describe('css', () => {
      it('create css variables', () => {
        const cssVarsParser = createCssVarsParser();
        const { css } = cssVarsParser({
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
          lineHeight: {
            xs: 1,
            sm: 1.2,
            md: 1.43,
          },
        });
        expect(css).to.deep.equal({
          '--palette-primary-100': '#ffffff',
          '--palette-primary-500': '#ff5252',
          '--lineHeight-xs': 1,
          '--lineHeight-sm': 1.2,
          '--lineHeight-md': 1.43,
        });
      });

      it('accept custom resolver', () => {
        const cssVarsParser = createCssVarsParser({
          getCssValue: (keys, value) => {
            let newValue = value;
            if (keys.includes('fontSize') && typeof value === 'number') {
              newValue = `${value}px`;
            }
            return newValue;
          },
          getCssVar: (keys) => `--mui-${keys.join('-')}`,
        });
        const { css } = cssVarsParser({
          lineHeight: {
            xs: 1,
            sm: 1.2,
            md: 1.43,
          },
          fontSize: {
            xs: 10,
            sm: 12,
            md: 16,
          },
        });
        expect(css).to.deep.equal({
          '--mui-lineHeight-xs': 1,
          '--mui-lineHeight-sm': 1.2,
          '--mui-lineHeight-md': 1.43,
          '--mui-fontSize-xs': '10px',
          '--mui-fontSize-sm': '12px',
          '--mui-fontSize-md': '16px',
        });
      });

      it('does nothing if deep value is not string or number', () => {
        const cssVarsParser = createCssVarsParser();
        const { css } = cssVarsParser({
          getContrastText: () => '',
          foo: undefined,
          bar: null,
        });
        expect(css).to.deep.equal({});
      });
    });

    describe('vars', () => {
      it('create same structure by default', () => {
        const cssVarsParser = createCssVarsParser();
        const { vars } = cssVarsParser({
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
          lineHeight: {
            xs: 1,
            sm: 1.2,
            md: 1.43,
          },
        });
        expect(vars).to.deep.equal({
          palette: {
            primary: {
              100: 'var(--palette-primary-100)',
              500: 'var(--palette-primary-500)',
            },
          },
          lineHeight: {
            xs: 'var(--lineHeight-xs)',
            sm: 'var(--lineHeight-sm)',
            md: 'var(--lineHeight-md)',
          },
        });
      });

      it('able to use custom vars creator', () => {
        const cssVarsParser = createCssVarsParser({
          appendVars: (vars, keys, cssVar) => {
            vars[keys.join('-')] = `var(${cssVar})`;
          },
        });
        const { vars } = cssVarsParser({
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        });
        expect(vars).to.deep.equal({
          'palette-primary-100': 'var(--palette-primary-100)',
          'palette-primary-500': 'var(--palette-primary-500)',
        });
      });
    });
  });
});
