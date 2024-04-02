import * as React from 'react';
import { expectType } from '@mui/types';
import { Select, SelectPopupSlotProps, SelectRootSlotProps } from '@mui/base/Select';

const SelectSlotPropsOverridesTest = (
  <Select
    slotProps={{
      root: {
        // @ts-expect-error - requires module augmentation
        size: 'red',
        className: 'test',
      },
      popup: {
        className: 'popup',
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

function CustomPopup<OptionValue extends {}, Multiple extends boolean>(
  props: SelectPopupSlotProps<OptionValue, Multiple>,
) {
  const { ownerState, ...other } = props;
  return <div {...other} />;
}

const SelectRootComponentOverridesTest = (
  <Select
    slots={{
      root: CustomRoot,
    }}
  />
);

const SelectPopupComponentOverridesTest = (
  <Select
    slots={{
      popup: CustomPopup,
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

      <Select<string, false, 'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Select<string, false, typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />

      {/* @ts-expect-error */}
      <Select<string, false, typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Select<string, false, 'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Select<string, false, 'button'>
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
