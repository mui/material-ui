import * as React from 'react';
import { expectType } from '@mui/types';
import OptionUnstyled, { OptionUnstyledRootSlotProps } from '@mui/base/OptionUnstyled';

const Root = React.forwardRef(function Root<OptionValue>(
  props: OptionUnstyledRootSlotProps<OptionValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const { ownerState, ...other } = props;

  return <li data-selected={ownerState.selected} {...other} ref={ref} />;
});

const option = <OptionUnstyled value={null} slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <OptionUnstyled invalidProp={0} />

      <OptionUnstyled
        value={1}
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <OptionUnstyled
        value={1}
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <OptionUnstyled
        value={1}
        slots={{
          root: CustomComponent,
        }}
      />

      <OptionUnstyled
        value={1}
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <OptionUnstyled<number, 'button'>
        value={1}
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
