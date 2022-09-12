import * as React from 'react';
import { expectType } from '@mui/types';
import OptionUnstyled, { OptionUnstyledRootSlotProps } from '@mui/base/OptionUnstyled';

const Root = React.forwardRef(function Root<TValue>(
  props: OptionUnstyledRootSlotProps<TValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const { ownerState, ...other } = props;

  return <li data-selected={ownerState.selected} {...other} ref={ref} />;
});

const option = <OptionUnstyled value={null} components={{ Root }} />;

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <OptionUnstyled invalidProp={0} />

      <OptionUnstyled value={1} component="a" href="#" />

      <OptionUnstyled value={1} component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <OptionUnstyled value={1} component={CustomComponent} />

      <OptionUnstyled
        value={1}
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <OptionUnstyled<number, 'button'>
        value={1}
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
