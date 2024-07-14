import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { Popper, popperClasses } from '@mui/base/Popper';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Popper />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformanceUnstyled(<Popper {...defaultProps} />, () => ({
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    slots: {
      root: {
        expectedClassName: popperClasses.root,
      },
    },
  }));

  it('should not pass ownerState to overridable component', () => {
    const CustomComponent = React.forwardRef<HTMLDivElement, any>(({ ownerState }, ref) => (
      <div ref={ref} data-testid="foo" id={ownerState.id} />
    ));
    render(
      <Popper
        anchorEl={() => document.createElement('div')}
        open
        slots={{ root: CustomComponent }}
      />,
    );

    expect(screen.getByTestId('foo')).to.not.have.attribute('id', 'id');
  });
});
