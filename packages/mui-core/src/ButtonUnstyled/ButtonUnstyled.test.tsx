import * as React from 'react';
import { createMount, createClientRender, describeConformanceUnstyled } from 'test/utils';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { expect } from 'chai';

describe('<ButtonUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

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

    it('is set when the root component is an component that renders an HTML component other than a button', () => {
      const WrappedSpan = (props: React.HTMLAttributes<HTMLSpanElement>) => (
        <span role={props.role} />
      );
      const { getByRole } = render(<ButtonUnstyled component={WrappedSpan} />);
      expect(getByRole('button')).not.to.equal(null);
    });
  });
});
