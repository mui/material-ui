import * as React from 'react';
import ButtonUnstyled, { ButtonOwnerState, ButtonProps } from '@mui/base/Button';

const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <ButtonUnstyled
      {...props}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `hover:text-cyan-500 transition-colors ${
            state.focusVisible ? 'outline-0 ring-2 ring-cyan-500' : ''
          }`,
        }),
      }}
      ref={ref}
    />
  );
});

export default Button;
