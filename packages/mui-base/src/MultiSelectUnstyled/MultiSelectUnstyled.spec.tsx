import * as React from 'react';
import { expectType } from '@mui/types';
import {
  MultiSelectUnstyled,
  MultiSelectUnstyledRootSlotProps,
  MultiSelectUnstyledPopperSlotProps,
  PopperUnstyled,
} from '@mui/base';

const MultiSelectUnstyledComponentsPropsOverridesTest = (
  <MultiSelectUnstyled
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

function CustomRoot<TValue extends {}>(props: MultiSelectUnstyledRootSlotProps<TValue>) {
  const { ownerState, ...other } = props;
  return <div {...other} />;
}

function CustomPopper<TValue extends {}>(props: MultiSelectUnstyledPopperSlotProps<TValue>) {
  const { ownerState, ...other } = props;
  return <PopperUnstyled {...other} />;
}

const MultiSelectUnstyledRootComponentOverridesTest = (
  <MultiSelectUnstyled
    slots={{
      root: CustomRoot,
      listbox: 'ul',
      popper: PopperUnstyled,
    }}
  />
);

const MultiSelectUnstyledPopperComponentOverridesTest = (
  <MultiSelectUnstyled
    slots={{
      popper: CustomPopper,
    }}
  />
);

function InvalidPopper({ requiredProp }: { requiredProp: string }) {
  return <div />;
}

const MultiSelectUnstyledComponentsOverridesUsingInvalidComponentTest = (
  <MultiSelectUnstyled
    slots={{
      // @ts-expect-error - provided a component that requires a prop MultiSelectUnstyled does not provide
      popper: InvalidPopper,
    }}
  />
);

const MultiSelectUnstyledComponentsOverridesUsingHostComponentTest = (
  <MultiSelectUnstyled
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
      <MultiSelectUnstyled invalidProp={0} />

      <MultiSelectUnstyled component="a" href="#" />

      <MultiSelectUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <MultiSelectUnstyled component={CustomComponent} />

      <MultiSelectUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <MultiSelectUnstyled<string, 'button'>
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
