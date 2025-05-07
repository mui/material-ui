import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Step, { stepClasses as classes } from '@mui/joy/Step';
import describeConformance from '../../test/describeConformance';

describe('<Step />', () => {
  const { render } = createRenderer();

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'JoyStep',
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
    testVariantProps: { orientation: 'vertical' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('apply horizontal and vertical classes', () => {
    const { container, rerender } = render(<Step />);

    expect(container.firstChild).to.have.class(classes.horizontal);

    rerender(<Step orientation="vertical" />);

    expect(container.firstChild).to.have.class(classes.vertical);
  });
});
