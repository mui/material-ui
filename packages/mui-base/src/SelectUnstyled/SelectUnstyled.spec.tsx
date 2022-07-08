import * as React from 'react';
import { SelectUnstyled, PopperUnstyled, SelectUnstyledRootSlotProps } from '@mui/base';
import { SelectUnstyledPopperSlotProps } from '.';

const SelectUnstyledComponentsPropsOverridesTest = (
  <SelectUnstyled
    componentsProps={{
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

function CustomRoot<TValue>(props: SelectUnstyledRootSlotProps<TValue>) {
  const { ownerState, ...other } = props;
  return <div {...other} />;
}

function CustomPopper<TValue>(props: SelectUnstyledPopperSlotProps<TValue>) {
  const { ownerState, ...other } = props;
  return <PopperUnstyled {...other} />;
}

const SelectUnstyledRootComponentOverridesTest = (
  <SelectUnstyled
    components={{
      Root: CustomRoot,
      Listbox: 'ul',
      Popper: PopperUnstyled,
    }}
  />
);

const SelectUnstyledPopperComponentOverridesTest = (
  <SelectUnstyled
    components={{
      Popper: CustomPopper,
    }}
  />
);

function InvalidPopper({ requiredProp }: { requiredProp: string }) {
  return <div />;
}

const SelectUnstyledComponentsOverridesUsingInvalidComponentTest = (
  <SelectUnstyled
    components={{
      // @ts-expect-error - provided a component that requires a prop SelectUnstyled does not provide
      Popper: InvalidPopper,
    }}
  />
);

const SelectUnstyledComponentsOverridesUsingHostComponentTest = (
  <SelectUnstyled
    components={{
      // @ts-expect-error - provided a host element instead of a component
      Popper: 'div',
    }}
  />
);
