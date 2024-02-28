import * as React from 'react';
import { expectType } from '@mui/types';
import {
  Checkbox,
  CheckboxRootSlotProps,
  CheckboxThumbSlotProps,
  CheckboxTrackSlotProps,
  CheckboxInputSlotProps,
} from '@mui/base/Checkbox';

const Root = React.forwardRef(function Root(
  props: CheckboxRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Input = React.forwardRef(function Input(
  props: CheckboxInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Thumb = React.forwardRef(function Thumb(
  props: CheckboxThumbSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Track = React.forwardRef(function Track(
  props: CheckboxTrackSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const styledCheckbox = (
  <Checkbox slots={{ root: Root, thumb: Thumb, track: Track, input: Input }} />
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Checkbox invalidProp={0} />

      <Checkbox<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Checkbox<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Checkbox<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Checkbox<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Checkbox<'button'>
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
