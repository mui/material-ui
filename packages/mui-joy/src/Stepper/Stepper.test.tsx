import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Stepper, { stepperClasses as classes } from '@mui/joy/Stepper';
import describeConformance from '../../test/describeConformance';

describe('<Stepper />', () => {
  const { render } = createRenderer();

  describeConformance(<Stepper />, () => ({
    classes,
    inheritComponent: 'ol',
    render,
    ThemeProvider,
    muiName: 'JoyStepper',
    refInstanceof: window.HTMLOListElement,
    testComponentPropWith: 'ul',
    testVariantProps: { orientation: 'vertical' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('can change size', () => {
    const { container, rerender } = render(<Stepper />);

    expect(container.firstChild).to.have.class(classes.sizeMd);

    rerender(<Stepper size="lg" />);

    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('add data-attribute to the first and last child', () => {
    const { container } = render(
      <Stepper>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Stepper>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
    expect(container.querySelector('[data-last-child]')).to.have.text('Third');
  });
});
