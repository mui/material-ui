import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Sheet, { sheetClasses as classes, SheetClassKey } from '@mui/joy/Sheet';
import describeConformance from '../../test/describeConformance';

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

  describe('prop: variant', () => {
    it('plain by default', () => {
      const { getByTestId } = render(<Sheet data-testid="root">Hello World</Sheet>);

      expect(getByTestId('root')).to.have.class(classes.variantPlain);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <Sheet data-testid="root" variant={variant}>
            Hello World
          </Sheet>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`variant${capitalize(variant)}` as SheetClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Sheet data-testid="root">Hello World</Sheet>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <Sheet data-testid="root" color={color}>
            Hello World
          </Sheet>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as SheetClassKey],
        );
      });
    });
  });
});
