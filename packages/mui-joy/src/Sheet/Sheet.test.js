import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Sheet, { sheetClasses as classes } from '@mui/joy/Sheet';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<Sheet />', () => {
  const { render } = createRenderer();

  describeConformance(<Sheet />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoySheet',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    testVariantProps: { variant: 'solid' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('plain by default', () => {
      const { getByTestId } = render(<Sheet data-testid="root">Hello World</Sheet>);

      expect(getByTestId('root')).to.have.class(classes.variantPlain);
    });

    ['plain', 'outlined', 'soft', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <Sheet data-testid="root" variant={variant}>
            Hello World
          </Sheet>,
        );

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Sheet data-testid="root">Hello World</Sheet>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <Sheet data-testid="root" color={color}>
            Hello World
          </Sheet>,
        );

        expect(getByTestId('root')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: elevation', () => {
    it('undefined by default', () => {
      const { getByTestId } = render(<Sheet data-testid="root">Hello World</Sheet>);

      expect(getByTestId('root')).not.to.have.class(classes.elevationXs);
      expect(getByTestId('root')).not.to.have.class(classes.elevationSm);
      expect(getByTestId('root')).not.to.have.class(classes.elevationMd);
      expect(getByTestId('root')).not.to.have.class(classes.elevationLg);
      expect(getByTestId('root')).not.to.have.class(classes.elevationXl);
    });
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach((elevation) => {
      it(`should render ${elevation}`, () => {
        const { getByTestId } = render(
          <Sheet data-testid="root" elevation={elevation}>
            Hello World
          </Sheet>,
        );

        expect(getByTestId('root')).to.have.class(classes[`elevation${capitalize(elevation)}`]);
      });
    });
  });
});
