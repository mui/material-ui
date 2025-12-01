import { expect } from 'chai';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, CssVarsProvider, extendTheme, PalettePrimary } from '@mui/joy/styles';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/joy/className';
import Box from '@mui/joy/Box';
import describeConformance from '../../test/describeConformance';

const isJSDOM = isJsdom();

describe('Joy <Box />', () => {
  const { render } = createRenderer();

  describeConformance(<Box />, () => ({
    muiName: 'JoyBox',
    classes: { root: ClassNameGenerator.generate('JoyBox') },
    render,
    ThemeProvider,
    inheritComponent: 'div',
    skip: [
      'componentProp',
      'componentsProp',
      'rootClass',
      'themeVariants',
      'themeStyleOverrides',
      'themeDefaultProps',
    ],
    refInstanceof: window.HTMLDivElement,
  }));

  it.skipIf(isJSDOM)('respects theme from context', function test() {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              ['main' as keyof PalettePrimary]: 'rgb(255, 0, 0)',
            },
          },
        },
      },
    });
    const { container } = render(
      <CssVarsProvider theme={theme}>
        <Box color="primary.main" />
      </CssVarsProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  describe('ClassNameGenerator', () => {
    afterEach(() => {
      ClassNameGenerator.reset();
    });

    it('get custom className', () => {
      const { container, rerender } = render(<Box />);
      expect(container.firstChild).to.have.class('MuiBox-root');

      ClassNameGenerator.configure((name) => name.replace('Mui', 'Company'));

      rerender(<Box />);

      expect(container.firstChild).to.have.class('CompanyBox-root');
    });
  });

  describe('sx', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              500: 'rgb(0, 0, 255)',
            },
          },
        },
      },
      radius: {
        md: '77px',
      },
      shadow: {
        md: 'rgb(0, 0, 0) 0px 0px 10px 0px',
      },
    });

    it.skipIf(isJSDOM)('color', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ color: 'primary.500' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
      });
    });

    it.skipIf(isJSDOM)('bgcolor', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ bgcolor: 'primary.500' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
    });

    it.skipIf(isJSDOM)('backgroundColor', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ backgroundColor: 'primary.500' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
    });

    it.skipIf(isJSDOM)('borderRadius', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ borderRadius: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        borderTopLeftRadius: '77px',
        borderTopRightRadius: '77px',
        borderBottomLeftRadius: '77px',
        borderBottomRightRadius: '77px',
      });
    });

    it.skipIf(isJSDOM)('boxShadow', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ boxShadow: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        boxShadow: 'rgb(0, 0, 0) 0px 0px 10px 0px',
      });
    });

    it.skipIf(isJSDOM)('fontSize', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ fontSize: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        fontSize: '16px',
      });
    });

    it.skipIf(isJSDOM)('fontWeight', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ fontWeight: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        fontWeight: '500',
      });
    });

    it.skipIf(isJSDOM)('lineHeight', function test() {
      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ lineHeight: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        lineHeight: '24px',
      });
    });
  });
});
