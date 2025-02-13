import * as React from 'react';
import { expectType } from '@mui/types';
import { FormControl } from '@mui/base/FormControl';
import { FormControlRootSlotProps } from './FormControl.types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function FormControlTest() {
  return (
    <div>
      <FormControl required />
      {/* @ts-expect-error */}
      <FormControl invalidProp={0} />

      <FormControl<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <FormControl<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />

      {/* @ts-expect-error */}
      <FormControl<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <FormControl<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          event.currentTarget.checkValidity()
        }
      />

      <FormControl<'button'>
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof event>(event);
          event.currentTarget.checkValidity();
        }}
      />
    </div>
  );
}

function Root(props: FormControlRootSlotProps) {
  const { ownerState, children, ...other } = props;
  return (
    <div data-filled={ownerState.filled} {...other}>
      {children as React.ReactNode}
    </div>
  );
}

const StyledFormControl = <FormControl slots={{ root: Root }} />;
