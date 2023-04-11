import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, describeJoyColorInversion } from 'test/utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardOverflow, { cardOverflowClasses as classes } from '@mui/joy/CardOverflow';

describe('<CardOverflow />', () => {
  const { render } = createRenderer();

  describeConformance(<CardOverflow />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyCardOverflow',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<CardOverflow />, { muiName: 'JoyCardOverflow', classes });

  describe('prop: variant', () => {
    it('plain by default', () => {
      const { getByTestId } = render(<CardOverflow data-testid="root">Hello World</CardOverflow>);

      expect(getByTestId('root')).to.have.class(classes.variantPlain);
    });

    ['plain', 'outlined', 'soft', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <CardOverflow data-testid="root" variant={variant}>
            Hello World
          </CardOverflow>,
        );

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<CardOverflow data-testid="root">Hello World</CardOverflow>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <CardOverflow data-testid="root" color={color}>
            Hello World
          </CardOverflow>,
        );

        expect(getByTestId('root')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });
});
