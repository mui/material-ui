import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, screen } from 'test/utils';
import PopperUnstyled from '@mui/base/PopperUnstyled';

describe('<PopperUnstyled />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformance(<PopperUnstyled {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    refInstanceof: window.HTMLDivElement,
    skip: [
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
    ],
  }));

  it('should pass ownerState to overridable component', () => {
    const CustomComponent = React.forwardRef(({ ownerState }, ref) => (
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
