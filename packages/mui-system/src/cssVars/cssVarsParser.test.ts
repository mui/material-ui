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

    it('create array given by `arrayKeys`', () => {
      const result = {};
      assignNestedKeys(result, ['keys', '0'], 'xs', ['keys']);
      assignNestedKeys(result, ['keys', '2'], 'md', ['keys']);
      assignNestedKeys(result, ['keys', '1'], 'sm', ['keys']);
      expect(result).to.deep.equal({
        keys: ['xs', 'sm', 'md'],
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

    it('skip the paths if `shouldSkipPaths` return true', () => {
      const result: Record<string, string> = {};
      walkObjectDeep<string>(
        {
          lv1: {
            lv2: 'test',
          },
          vars: {
            lv2: 'skip',
          },
        },
        (keys, value) => {
          result[keys.join('-')] = value;
        },
        (keys) => keys[0] === 'vars',
      );
      expect(result).to.deep.equal({
        'lv1-lv2': 'test',
      });
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

    it('use prefix if provided', () => {
      const theme = {
        bg: 'var(--palette-neutral-50)',
        text: {
          heading: 'var(--palette-primary-500, var(--palette-neutral-500))',
        },
      };
      const { css } = cssVarsParser(theme, {
        prefix: 'foo-bar',
      });
      expect(css).to.deep.equal({
        '--foo-bar-bg': 'var(--foo-bar-palette-neutral-50)',
        '--foo-bar-text-heading':
          'var(--foo-bar-palette-primary-500, var(--foo-bar-palette-neutral-500))',
      });
    });

    it('replace default prefix if provided', () => {
      const theme = {
        fontFamily: {
          body: '"Public Sans", var( --joy-fontFamily-fallback)',
          display: '"Public Sans", var(    --joy-fontFamily-fallback)',
        },
      };
      const { css } = cssVarsParser(theme, {
        prefix: 'foo-bar',
        basePrefix: 'joy',
      });
      expect(css).to.deep.equal({
        '--foo-bar-fontFamily-body': '"Public Sans", var(--foo-bar-fontFamily-fallback)',
        '--foo-bar-fontFamily-display': '"Public Sans", var(--foo-bar-fontFamily-fallback)',
      });
    });

    it('replace value starts with `var` if basePrefix, prefix are different', () => {
      const theme = {
        bg: 'var(--joy-palette-neutral-50)',
        text: {
          heading: 'var(--joy-palette-primary-500, var(--joy-palette-neutral-500))',
        },
      };
      const { css } = cssVarsParser(theme, {
        basePrefix: 'joy',
        prefix: 'custom',
      });
      expect(css).to.deep.equal({
        '--custom-bg': 'var(--custom-palette-neutral-50)',
        '--custom-text-heading':
          'var(--custom-palette-primary-500, var(--custom-palette-neutral-500))',
      });
    });

    it('basePrefix in the value is removed if prefix is ""', () => {
      const theme = {
        bg: 'var(--joy-palette-neutral-50, var(--joy-colors-white))',
        text: {
          heading: 'var(--joy-palette-primary-500)',
        },
      };
      const { css } = cssVarsParser(theme, {
        basePrefix: 'joy',
        prefix: '',
      });
      expect(css).to.deep.equal({
        '--bg': 'var(--palette-neutral-50, var(--colors-white))',
        '--text-heading': 'var(--palette-primary-500)',
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

    it('does not attach px to color channel values', () => {
      const { css } = cssVarsParser({
        primary: {
          mainChannel: '144 202 249',
          darkChannel: '66 165 245',
          lightChannel: '0 100% 50%',
        },
      });
      expect(css).to.deep.equal({
        '--primary-mainChannel': '144 202 249',
        '--primary-darkChannel': '66 165 245',
        '--primary-lightChannel': '0 100% 50%',
      });
    });

    it('does not attach px to opacity values', () => {
      const { css } = cssVarsParser({
        primary: {
          hoverOpacity: 0.02,
          disabledOpacity: 0.5,
          opacity: 1,
        },
      });
      expect(css).to.deep.equal({
        '--primary-hoverOpacity': 0.02,
        '--primary-disabledOpacity': 0.5,
        '--primary-opacity': 1,
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

    it('css is not created if shouldSkipGeneratingVar return true', () => {
      const { css } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        {
          shouldSkipGeneratingVar: (keys) => keys.slice(-1)[0] === '500',
        },
      );
      expect(css).to.deep.equal({
        '--palette-primary-100': '#ffffff',
      });
    });

    it('css can be produced from array', () => {
      const { css } = cssVarsParser({
        shadows: ['sm', 'md', 'lg'],
      });
      expect(css).to.deep.equal({
        '--shadows-0': 'sm',
        '--shadows-1': 'md',
        '--shadows-2': 'lg',
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

    it('var is not created if shouldSkipGeneratingVar return true', () => {
      const { vars } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        {
          shouldSkipGeneratingVar: (keys) => keys.slice(-1)[0] === '500',
        },
      );
      expect(vars).to.deep.equal({
        palette: {
          primary: {
            100: 'var(--palette-primary-100)',
          },
        },
      });
    });

    it('vars can be produced from array', () => {
      const { vars } = cssVarsParser({
        shadows: ['sm', 'md', 'lg'],
      });
      expect(vars).to.deep.equal({
        shadows: ['var(--shadows-0)', 'var(--shadows-1)', 'var(--shadows-2)'],
      });
    });
  });

  describe('parsedObject', () => {
    it('creates a new object on every call', () => {
      const theme = {
        primary: {
          500: '#ffffff',
          main: 'var(--palette-500)',
        },
      };
      const { parsedTheme } = cssVarsParser(theme, { prefix: 'foo' });
      const { parsedTheme: parsedTheme2 } = cssVarsParser(theme, { prefix: 'bar' });
      expect(theme).not.to.equal(parsedTheme);
      expect(parsedTheme).to.deep.equal({
        primary: {
          500: '#ffffff',
          main: 'var(--foo-palette-500)',
        },
      });
      expect(parsedTheme2).to.deep.equal({
        primary: {
          500: '#ffffff',
          main: 'var(--bar-palette-500)',
        },
      });
      expect(parsedTheme).not.to.deep.equal(parsedTheme2);
    });

    it('preserve array even if the key is listed in `shouldSkipGeneratingVar`', () => {
      const theme = {
        breakpoints: {
          keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
      };
      const { parsedTheme } = cssVarsParser(theme, {
        shouldSkipGeneratingVar: (keys) => keys[0] === 'breakpoints',
      });
      expect(parsedTheme.breakpoints.keys).to.deep.equal(['xs', 'sm', 'md', 'lg', 'xl']);
    });

    it('preserve function value', () => {
      const theme = {
        palette: {
          getContrastText: () => 'foo',
        },
        pxToRem: (px: number) => `${px / 16}rem`,
      };
      const { parsedTheme } = cssVarsParser(theme);
      expect(parsedTheme.palette.getContrastText()).to.equal('foo');
      expect(parsedTheme.pxToRem(16)).to.equal('1rem');
    });

    it('apply prefix to CSS variable value', () => {
      const { parsedTheme } = cssVarsParser(
        {
          palette: {
            primary: {
              main: 'var(--palette-token)',
            },
            secondary: {
              main: 'var(--palette-token, var(--palette-token))',
            },
          },
        },
        { prefix: 'foo' },
      );
      expect(parsedTheme).to.deep.equal({
        palette: {
          primary: {
            main: 'var(--foo-palette-token)',
          },
          secondary: {
            main: 'var(--foo-palette-token, var(--foo-palette-token))',
          },
        },
      });
    });

    it('replace basePrefix with prefix', () => {
      const { parsedTheme } = cssVarsParser(
        {
          palette: {
            primary: {
              main: 'var(--foo-palette-token)',
            },
            secondary: {
              main: 'var(--foo-palette-token, var(--foo-palette-token))',
            },
          },
        },
        { prefix: 'joy', basePrefix: 'foo' },
      );
      expect(parsedTheme).to.deep.equal({
        palette: {
          primary: {
            main: 'var(--joy-palette-token)',
          },
          secondary: {
            main: 'var(--joy-palette-token, var(--joy-palette-token))',
          },
        },
      });
    });

    it('all key,values remains in parsedTheme even shouldSkipGeneratingVar is provided', () => {
      const { parsedTheme } = cssVarsParser(
        {
          pxToRem: (px: number) => `${px / 16}rem`,
          typography: {
            body: {
              fontSize: 'var(--fontSize-md)',
              fontFamily: 'Roboto, var(--fontFamily-fallback)',
            },
          },
        },
        { prefix: 'foo', shouldSkipGeneratingVar: (keys) => keys[0] === 'typgoraphy' },
      );
      expect(parsedTheme.pxToRem(14)).to.equal('0.875rem');
      expect(parsedTheme.typography).to.deep.equal({
        body: {
          fontSize: 'var(--foo-fontSize-md)',
          fontFamily: 'Roboto, var(--foo-fontFamily-fallback)',
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
