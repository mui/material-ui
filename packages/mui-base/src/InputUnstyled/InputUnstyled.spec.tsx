import * as React from 'react';
import InputUnstyled, {
  InputUnstyledInputSlotProps,
  InputUnstyledRootSlotProps,
} from '@mui/base/InputUnstyled';
import { expectType } from '@mui/types';

const InputRoot = React.forwardRef(function InputRoot(
  props: InputUnstyledRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-focused={ownerState.focused} {...other} ref={ref} />;
});

const InputInput = React.forwardRef(function InputInput(
  props: InputUnstyledInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-focused={ownerState.focused} {...other} ref={ref} />;
});

const styledInput = <InputUnstyled slots={{ root: InputRoot, input: InputInput }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <InputUnstyled invalidProp={0} />

      <InputUnstyled
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <InputUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <InputUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <InputUnstyled
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <InputUnstyled<'button'>
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
