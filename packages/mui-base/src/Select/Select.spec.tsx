import * as React from 'react';
import { expectType } from '@mui/types';
import {
  Select,
  SelectRootSlotProps,
  SelectPopperSlotProps,
  Popper,
  WithOptionalOwnerState,
} from '@mui/base';

const SelectSlotPropsOverridesTest = (
  <Select
    slotProps={{
      root: {
        // @ts-expect-error - requires module augmentation
        size: 'red',
        className: 'test',
      },
      popper: {
        className: 'popper',
        disablePortal: true,
      },
      listbox: {
        className: 'listbox',
        onMouseOver: () => {},
      },
    }}
  />
);

function CustomRoot<OptionValue extends {}, Multiple extends boolean>(
  props: SelectRootSlotProps<OptionValue, Multiple>,
) {
  const { ownerState, ...other } = props;
  return <div {...other} />;
}

function CustomPopper<OptionValue extends {}, Multiple extends boolean>(
  props: WithOptionalOwnerState<SelectPopperSlotProps<OptionValue, Multiple>>,
) {
  const { ownerState, ...other } = props;
  return <Popper {...other} />;
}

const SelectRootComponentOverridesTest = (
  <Select
    slots={{
      root: CustomRoot,
      listbox: 'ul',
      popper: Popper,
    }}
  />
);

const SelectPopperComponentOverridesTest = (
  <Select
    slots={{
      popper: CustomPopper,
    }}
  />
);

function InvalidPopper({ requiredProp }: { requiredProp: string }) {
  return <div />;
}

const SelectSlotsOverridesUsingInvalidComponentTest = (
  <Select
    slots={{
      // @ts-expect-error - provided a component that requires a prop Select does not provide
      popper: InvalidPopper,
    }}
  />
);

const SelectSlotsOverridesUsingHostComponentTest = (
  <Select
    slots={{
      // @ts-expect-error - provided a host element instead of a component
      popper: 'div',
    }}
  />
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Select invalidProp={0} />

      <Select component="a" href="#" />

      <Select component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Select component={CustomComponent} />

      <Select
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Select<string, 'button'>
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
