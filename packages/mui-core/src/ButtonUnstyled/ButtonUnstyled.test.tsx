import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { expect } from 'chai';

describe('<ButtonUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<ButtonUnstyled />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiButton',
    slots: {
      root: {
        expectedClassName: buttonUnstyledClasses.root,
      },
    },
  }));

  describe('role attribute', () => {
    it('is set when the root component is an HTML element other than a button', () => {
      const { getByRole } = render(<ButtonUnstyled component="span" />);
      expect(getByRole('button')).not.to.equal(null);
    });

    it('is set when the root component is a component that renders an HTML component other than a button', () => {
      const WrappedSpan = React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLSpanElement>,
          ref: React.ForwardedRef<HTMLSpanElement>,
        ) => <span role={props.role} ref={ref} />,
      );

      const { getByRole } = render(<ButtonUnstyled component={WrappedSpan} />);
      expect(getByRole('button')).not.to.equal(null);
    });

    it('is not set when the root component is a component that renders an HTML button component', () => {
      const WrappedButton = React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLButtonElement>,
          ref: React.ForwardedRef<HTMLButtonElement>,
        ) => <button role={props.role} ref={ref} />,
      );

      const { getByRole } = render(<ButtonUnstyled component={WrappedButton} />);
      expect(getByRole('button')).not.to.have.attribute('role');
    });
  });
});
