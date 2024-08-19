import * as React from 'react';
import { expect } from 'chai';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import StepIndicator, { stepIndicatorClasses as classes } from '@mui/joy/StepIndicator';
import describeConformance from '../../test/describeConformance';

describe('<StepIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<StepIndicator />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyStepIndicator',
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
    it('by default, should render with the root, variantSoft classes', () => {
      const { container } = render(<StepIndicator>Hello World</StepIndicator>);

      expect(container.firstChild).to.have.class(classes.root);
      expect(container.firstChild).to.have.class(classes.variantSoft);
    });

    (['plain', 'outlined', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { container } = render(<StepIndicator variant={variant} />);

        expect(container.firstChild).to.have.class(
          classes[`variant${capitalize(variant)}` as keyof typeof classes],
        );
      });
    });
  });

  describe('prop: color', () => {
    it('by default, should render with the root, colorNeutral classes', () => {
      const { container } = render(<StepIndicator>Hello World</StepIndicator>);

      expect(container.firstChild).to.have.class(classes.root);
      expect(container.firstChild).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { container } = render(<StepIndicator color={color} />);

        expect(container.firstChild).to.have.class(
          classes[`color${capitalize(color)}` as keyof typeof classes],
        );
      });
    });
  });
});
