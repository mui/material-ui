import * as React from 'react';
import { expectType } from '@mui/types';
import { Input, InputInputSlotProps, InputRootSlotProps } from '@mui/base/Input';

const InputRoot = React.forwardRef(function InputRoot(
  props: InputRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-focused={ownerState.focused} {...other} ref={ref} />;
});

const InputInput = React.forwardRef(function InputInput(
  props: InputInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-focused={ownerState.focused} {...other} ref={ref} />;
});

const styledInput = <Input slots={{ root: InputRoot, input: InputInput }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Input invalidProp={0} />

      <Input<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Input<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Input<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Input<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Input<'button'>
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
