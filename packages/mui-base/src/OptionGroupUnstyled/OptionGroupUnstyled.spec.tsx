import * as React from 'react';
import { expectType } from '@mui/types';
import OptionGroupUnstyled, {
  OptionGroupUnstyledLabelSlotProps,
  OptionGroupUnstyledListSlotProps,
  OptionGroupUnstyledRootSlotProps,
} from '@mui/base/OptionGroupUnstyled';

const Root = React.forwardRef(function Root(
  props: OptionGroupUnstyledRootSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const Label = React.forwardRef(function Label(
  props: OptionGroupUnstyledLabelSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const List = React.forwardRef(function List(
  props: OptionGroupUnstyledListSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const option = <OptionGroupUnstyled components={{ Root, Label, List }} />;

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <OptionGroupUnstyled invalidProp={0} />

      <OptionGroupUnstyled component="a" href="#" />

      <OptionGroupUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <OptionGroupUnstyled component={CustomComponent} />

      <OptionGroupUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <OptionGroupUnstyled<'button'>
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
