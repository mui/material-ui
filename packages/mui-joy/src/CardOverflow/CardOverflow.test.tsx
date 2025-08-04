import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import CardOverflow, {
  CardOverflowClassKey,
  cardOverflowClasses as classes,
} from '@mui/joy/CardOverflow';
import describeConformance from '../../test/describeConformance';

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

  describe('prop: variant', () => {
    it('plain by default', () => {
      const { getByTestId } = render(<CardOverflow data-testid="root">Hello World</CardOverflow>);

      expect(getByTestId('root')).to.have.class(classes.variantPlain);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <CardOverflow data-testid="root" variant={variant}>
            Hello World
          </CardOverflow>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`variant${capitalize(variant)}` as CardOverflowClassKey],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<CardOverflow data-testid="root">Hello World</CardOverflow>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <CardOverflow data-testid="root" color={color}>
            Hello World
          </CardOverflow>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as CardOverflowClassKey],
        );
      });
    });
  });
});
