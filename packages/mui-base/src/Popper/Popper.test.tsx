import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { Popper, popperClasses } from '@mui/base/Popper';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

function createAnchor(element = 'div') {
  const anchor = document.createElement(element);
  document.body.appendChild(anchor);
  return anchor;
}

describe('<Popper />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    anchorEl: () => createAnchor('svg'),
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
    render(<Popper anchorEl={() => createAnchor()} open slots={{ root: CustomComponent }} />);

    expect(screen.getByTestId('foo')).to.not.have.attribute('id', 'id');
  });
});
