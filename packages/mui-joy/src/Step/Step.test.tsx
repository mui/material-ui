import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Step, { stepClasses as classes } from '@mui/joy/Step';

describe('<Step />', () => {
  const { render } = createRenderer();

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyStep',
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
    const { container, rerender } = render(<Step />);

    expect(container.firstChild).to.have.class(classes.sizeMd);

    rerender(<Step size="lg" />);

    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('add data-attribute to the first and last child', () => {
    const { container } = render(
      <Step>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Step>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
    expect(container.querySelector('[data-last-child]')).to.have.text('Third');
  });
});
