import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import Button from '@mui/base/Button';
import * as React from 'react';
import createSlot from './createSlot';

describe('createSlot', () => {
  const { render } = createRenderer();
  it('should not warn about ownerState', () => {
    const ThirdPartyComponent = React.forwardRef<HTMLButtonElement>((props, ref) => {
      // @ts-ignore just double checking that it is not defined
      expect(props.ownerState).to.equal(undefined);
      return <button {...props} ref={ref} />;
    });

    expect(() =>
      render(<Button slots={{ root: createSlot(ThirdPartyComponent) }} />),
    ).not.toErrorDev();
  });
});
