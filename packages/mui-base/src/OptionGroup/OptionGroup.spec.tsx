import * as React from 'react';
import { expectType } from '@mui/types';
import {
  OptionGroup,
  OptionGroupLabelSlotProps,
  OptionGroupListSlotProps,
  OptionGroupRootSlotProps,
} from '@mui/base/OptionGroup';

const Root = React.forwardRef(function Root(
  props: OptionGroupRootSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const Label = React.forwardRef(function Label(
  props: OptionGroupLabelSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const List = React.forwardRef(function List(
  props: OptionGroupListSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const option = <OptionGroup slots={{ root: Root, label: Label, list: List }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <OptionGroup invalidProp={0} />

      <OptionGroup<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <OptionGroup<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <OptionGroup<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <OptionGroup<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <OptionGroup<'button'>
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
