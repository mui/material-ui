import { expect } from 'chai';
import cssVarsParser, { assignNestedKeys, walkObjectDeep } from './cssVarsParser';

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

    it('does not throw if the value is null', () => {
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

  describe('css', () => {
    it('create css variables', () => {
      const { css } = cssVarsParser({
        palette: {
          primary: {
            100: '#ffffff',
            500: '#ff5252',
          },
        },
      });
      expect(css).to.deep.equal({
        '--palette-primary-100': '#ffffff',
        '--palette-primary-500': '#ff5252',
      });
    });

    it('add prefix to variables', () => {
      const { css } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        { prefix: 'mui' },
      );
      expect(css).to.deep.equal({
        '--mui-palette-primary-100': '#ffffff',
        '--mui-palette-primary-500': '#ff5252',
      });
    });

    it('attach px to number value', () => {
      const { css } = cssVarsParser({
        fontSize: {
          xs: 10,
          sm: 12,
          md: 16,
        },
      });
      expect(css).to.deep.equal({
        '--fontSize-xs': '10px',
        '--fontSize-sm': '12px',
        '--fontSize-md': '16px',
      });
    });

    it('does not add px to unitless properties', () => {
      const { css } = cssVarsParser({
        lineHeight: {
          xs: 1,
          sm: 1.2,
          md: 1.43,
        },
        fontWeight: {
          semiBold: 600,
          bold: 700,
        },
        opacity: {
          active: 0.5,
          hover: 0.2,
        },
        zIndex: {
          tooltip: 1200,
        },
      });
      expect(css).to.deep.equal({
        '--lineHeight-xs': 1,
        '--lineHeight-sm': 1.2,
        '--lineHeight-md': 1.43,
        '--fontWeight-semiBold': 600,
        '--fontWeight-bold': 700,
        '--opacity-active': 0.5,
        '--opacity-hover': 0.2,
        '--zIndex-tooltip': 1200,
      });
    });
  });

  describe('vars', () => {
    it('create same structure and attach variables', () => {
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

    it('apply prefix to variables', () => {
      const { vars } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        { prefix: 'mui' },
      );
      expect(vars).to.deep.equal({
        palette: {
          primary: {
            100: 'var(--mui-palette-primary-100)',
            500: 'var(--mui-palette-primary-500)',
          },
        },
      });
    });
  });

  it('does nothing if deep value is not string or number', () => {
    const { css, vars } = cssVarsParser({
      fooBar: () => '',
      foo: undefined,
      bar: null,
    });
    expect(css).to.deep.equal({});
    expect(vars).to.deep.equal({});
  });
});
