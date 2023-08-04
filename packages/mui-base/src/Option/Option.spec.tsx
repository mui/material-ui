import * as React from 'react';
import { expectType } from '@mui/types';
import { Option, OptionRootSlotProps } from '@mui/base/Option';

const Root = React.forwardRef(function Root<OptionValue>(
  props: OptionRootSlotProps<OptionValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const { ownerState, ...other } = props;

  return <li data-selected={ownerState.selected} {...other} ref={ref} />;
});

const option = <Option value={null} slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Option invalidProp={0} />

      <Option<number, 'a'>
        value={1}
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Option<number, typeof CustomComponent>
        value={1}
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Option<number, typeof CustomComponent>
        value={1}
        slots={{
          root: CustomComponent,
        }}
      />

      <Option<number, 'button'>
        value={1}
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Option<number, 'button'>
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
