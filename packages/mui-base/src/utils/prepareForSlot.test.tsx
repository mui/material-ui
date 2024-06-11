import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { Button } from '@mui/base/Button';
import { prepareForSlot } from './prepareForSlot';

describe('prepareForSlot', () => {
  const { render } = createRenderer();

  it('should not warn about ownerState', () => {
    const ThirdPartyComponent = React.forwardRef<HTMLButtonElement>((props, ref) => {
      // @ts-ignore just double checking that it is not defined
      expect(props.ownerState).to.equal(undefined);
      return <button {...props} ref={ref} />;
    });

    expect(() =>
      render(<Button slots={{ root: prepareForSlot(ThirdPartyComponent) }} />),
    ).not.toErrorDev();
  });
});
