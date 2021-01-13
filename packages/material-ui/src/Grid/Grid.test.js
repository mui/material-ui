import * as React from 'react';
import { expect } from 'chai';
import { createMount, describeConformanceV5, createClientRender } from 'test/utils';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from './Grid';
import classes from './gridClasses';

describe('<Grid />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<Grid />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiGrid',
    testVariantProps: { container: true, spacing: 5 },
    testStateOverrides: { prop: 'container', value: true, styleKey: 'container' },
    skip: ['componentsProp'],
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const { container } = render(<Grid container />);

      expect(container.firstChild).to.have.class(classes.container);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const { container } = render(<Grid item />);

      expect(container.firstChild).to.have.class(classes.item);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid item xs />);

      expect(container.firstChild).to.have.class(classes['grid-xs-true']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid item xs={3} />);

      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid item xs="auto" />);

      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);

      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
    });
  });

  describe('prop: alignItems', () => {
    it('should apply the align-item class', () => {
      const { container } = render(<Grid alignItems="center" container />);

      expect(container.firstChild).to.have.class(classes['align-items-xs-center']);
    });
  });

  describe('prop: alignContent', () => {
    it('should apply the align-content class', () => {
      const { container } = render(<Grid alignContent="center" container />);

      expect(container.firstChild).to.have.class(classes['align-content-xs-center']);
    });
  });

  describe('prop: justifyContent', () => {
    it('should apply the justify-content class', () => {
      const { container } = render(<Grid justifyContent="space-evenly" container />);

      expect(container.firstChild).to.have.class(classes['justify-content-xs-space-evenly']);
    });
  });

  describe('gutter', () => {
    it('should generate the right values', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) this.skip();

      const remValue = 16;
      const remTheme = createMuiTheme({
        spacing: (factor) => `${0.25 * factor}rem`,
      });

      const { container, getByTestId } = render(
        <ThemeProvider theme={remTheme}>
          <Grid container spacing={2}>
            <Grid item data-testid="first-custom-theme" />
            <Grid item />
          </Grid>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        marginTop: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        marginBottom: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        marginLeft: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        marginRight: `${-1 * remValue * 0.25}px`, // '-0.25rem'
        // width: `${750 + remValue * 0.5}px`, // 'calc(100% + 0.5rem)'
      });

      expect(getByTestId('first-custom-theme')).toHaveComputedStyle({
        paddingTop: `${0.25 * remValue}px`, // 0.25rem
        paddingBottom: `${0.25 * remValue}px`, // 0.25rem
        paddingLeft: `${0.25 * remValue}px`, // 0.25rem
        paddingRight: `${0.25 * remValue}px`, // 0.25rem
      });

      const { container: defaultThemeContainer, getByTestId: defaultThemeGetByTestId } = render(
        <Grid container spacing={2}>
          <Grid item data-testid="first-default-theme" />
          <Grid item />
        </Grid>,
      );

      expect(defaultThemeContainer.firstChild).toHaveComputedStyle({
        marginTop: '-8px',
        marginBottom: '-8px',
        marginLeft: '-8px',
        marginRight: '-8px',
        // width: `${750 + 16}px`, // 'calc(100% + 16px)'
      });

      expect(defaultThemeGetByTestId('first-default-theme')).toHaveComputedStyle({
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      });
    });
  });
});
