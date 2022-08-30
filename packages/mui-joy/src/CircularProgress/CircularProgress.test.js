import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import CircularProgress, { circularProgressClasses as classes } from '@mui/joy/CircularProgress';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<CircularProgress />', () => {
  const { render } = createRenderer();

  describeConformance(<CircularProgress />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'JoyCircularProgress',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { variant: 'soft' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('solid by default', () => {
      const { getByRole } = render(<CircularProgress />);

      expect(getByRole('progressbar')).to.have.class(classes.variantSolid);
    });

    ['plain', 'outlined', 'soft', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(<CircularProgress variant={variant} />);

        expect(getByRole('progressbar')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      const { getByRole } = render(<CircularProgress />);

      expect(getByRole('progressbar')).to.have.class(classes.colorPrimary);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(<CircularProgress color={color} />);

        expect(getByRole('progressbar')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByRole } = render(<CircularProgress />);

      expect(getByRole('progressbar')).to.have.class(classes.sizeMd);
    });
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(<CircularProgress size={size} />);

        expect(getByRole('progressbar')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });
});
