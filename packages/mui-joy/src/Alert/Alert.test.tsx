import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
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
      render(<Alert />);

      expect(screen.getByRole('alert')).to.have.class(classes.variantSoft);
    });

    (['plain', 'outlined', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(<Alert variant={variant} />);

        expect(screen.getByRole('alert')).to.have.class(
          classes[`variant${capitalize(variant)}` as AlertClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      render(<Alert />);

      expect(screen.getByRole('alert')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<Alert color={color} />);

        expect(screen.getByRole('alert')).to.have.class(
          classes[`color${capitalize(color)}` as AlertClassKey],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      render(<Alert />);

      expect(screen.getByRole('alert')).to.have.class(classes.sizeMd);
    });

    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        render(<Alert size={size} />);

        expect(screen.getByRole('alert')).to.have.class(
          classes[`size${capitalize(size)}` as AlertClassKey],
        );
      });
    });
  });
});
