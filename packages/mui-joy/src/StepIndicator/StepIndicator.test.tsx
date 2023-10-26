import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import StepIndicator, { stepIndicatorClasses as classes } from '@mui/joy/StepIndicator';

describe('<StepIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<StepIndicator />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyStepIndicator',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'ul',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('can change size', () => {
    const { container, rerender } = render(<StepIndicator />);

    expect(container.firstChild).to.have.class(classes.sizeMd);

    rerender(<StepIndicator size="lg" />);

    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('add data-attribute to the first and last child', () => {
    const { container } = render(
      <StepIndicator>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </StepIndicator>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
    expect(container.querySelector('[data-last-child]')).to.have.text('Third');
  });
});
