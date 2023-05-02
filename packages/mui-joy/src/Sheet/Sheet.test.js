import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, describeJoyColorInversion } from 'test/utils';
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
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<Sheet />, { muiName: 'JoySheet', classes });

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
});
