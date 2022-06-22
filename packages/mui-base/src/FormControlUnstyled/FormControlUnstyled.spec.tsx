import * as React from 'react';
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { expectType } from '@mui/types';
import { FormControlUnstyledRootSlotProps } from './FormControlUnstyled.types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

const FormControlUnstyledTest = () => (
  <div>
    <FormControlUnstyled required />
    {/* @ts-expect-error */}
    <FormControlUnstyled invalidProp={0} />

    <FormControlUnstyled component="a" href="#" />

    <FormControlUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
    {/* @ts-expect-error */}
    <FormControlUnstyled component={CustomComponent} />

    <FormControlUnstyled
      component="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
    />

    <FormControlUnstyled<'button'>
      component="button"
      ref={(elem) => {
        expectType<HTMLButtonElement | null, typeof elem>(elem);
      }}
      onClick={(e) => {
        expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
        e.currentTarget.checkValidity();
      }}
    />
  </div>
);

function Root(props: FormControlUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-filled={ownerState.filled} {...other} />;
}

const StyledFormControl = <FormControlUnstyled components={{ Root }} />;
