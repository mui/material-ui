import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, createMount, describeConformanceUnstyled, screen } from 'test/utils';
import PopperUnstyled, { popperUnstyledClasses } from '@mui/base/PopperUnstyled';

describe('<PopperUnstyled />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformanceUnstyled(<PopperUnstyled {...defaultProps} />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
    ],
    slots: {
      root: {
        expectedClassName: popperUnstyledClasses.root,
      },
    },
  }));

  it('should pass ownerState to overridable component', () => {
    const CustomComponent = React.forwardRef<HTMLDivElement, any>(({ ownerState }, ref) => (
      <div ref={ref} data-testid={ownerState.foo} />
    ));
    render(
      <PopperUnstyled
        anchorEl={() => document.createElement('div')}
        open
        component={CustomComponent}
        ownerState={{ foo: 'foo' }}
      />,
    );

    expect(screen.getByTestId('foo')).toBeVisible();
  });
});
