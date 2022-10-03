import * as React from 'react';
import SwitchUnstyled, {
  SwitchUnstyledRootSlotProps,
  SwitchUnstyledThumbSlotProps,
  SwitchUnstyledTrackSlotProps,
  SwitchUnstyledInputSlotProps,
} from '@mui/base/SwitchUnstyled';
import { expectType } from '@mui/types';

const Root = React.forwardRef(function Root(
  props: SwitchUnstyledRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Input = React.forwardRef(function Input(
  props: SwitchUnstyledInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Thumb = React.forwardRef(function Thumb(
  props: SwitchUnstyledThumbSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Track = React.forwardRef(function Track(
  props: SwitchUnstyledTrackSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const styledSwitch = <SwitchUnstyled components={{ Root, Thumb, Track, Input }} />;

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <SwitchUnstyled invalidProp={0} />

      <SwitchUnstyled component="a" href="#" />

      <SwitchUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <SwitchUnstyled component={CustomComponent} />

      <SwitchUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <SwitchUnstyled<'button'>
        component="button"
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
