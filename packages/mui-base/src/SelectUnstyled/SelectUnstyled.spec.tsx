import * as React from 'react';
import { SelectUnstyled, PopperUnstyled } from '@mui/base';
import { SlotComponentProps, SlotComponentType } from '@mui/types';
import { SelectUnstyledOwnerState } from '.';

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

const CustomRoot: SlotComponentType<SelectUnstyledOwnerState<string>> = (
  props: SlotComponentProps<SelectUnstyledOwnerState<string>>,
) => {
  const { ownerState, ...other } = props;
  return <div {...other} />;
};

const SelectUnstyledComponentsOverridesTest = (
  <SelectUnstyled
    components={{
      Root: CustomRoot,
      Listbox: 'ul',
      Popper: PopperUnstyled,
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
