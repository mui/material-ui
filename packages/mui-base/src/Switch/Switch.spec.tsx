import * as React from 'react';
import { expectType } from '@mui/types';
import {
  Switch,
  SwitchRootSlotProps,
  SwitchThumbSlotProps,
  SwitchTrackSlotProps,
  SwitchInputSlotProps,
} from '@mui/base/Switch';

const Root = React.forwardRef(function Root(
  props: SwitchRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Input = React.forwardRef(function Input(
  props: SwitchInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Thumb = React.forwardRef(function Thumb(
  props: SwitchThumbSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Track = React.forwardRef(function Track(
  props: SwitchTrackSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const styledSwitch = <Switch slots={{ root: Root, thumb: Thumb, track: Track, input: Input }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Switch invalidProp={0} />

      <Switch<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Switch<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Switch<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Switch<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Switch<'button'>
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
