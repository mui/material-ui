import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Alert, { AlertClassKey, alertClasses as classes } from '@mui/joy/Alert';
import describeConformance from '../../test/describeConformance';

describe('<Alert />', () => {
  const { render } = createRenderer();

  describeConformance(<Alert startDecorator="1" endDecorator="2" />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAlert',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('soft by default', () => {
      const { getByRole } = render(<Alert />);

      expect(getByRole('alert')).to.have.class(classes.variantSoft);
    });

    (['plain', 'outlined', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(<Alert variant={variant} />);

        expect(getByRole('alert')).to.have.class(
          classes[`variant${capitalize(variant)}` as AlertClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      const { getByRole } = render(<Alert />);

      expect(getByRole('alert')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(<Alert color={color} />);

        expect(getByRole('alert')).to.have.class(
          classes[`color${capitalize(color)}` as AlertClassKey],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByRole } = render(<Alert />);

      expect(getByRole('alert')).to.have.class(classes.sizeMd);
    });

    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(<Alert size={size} />);

        expect(getByRole('alert')).to.have.class(
          classes[`size${capitalize(size)}` as AlertClassKey],
        );
      });
    });
  });
});
