import * as React from 'react';
import { expectType } from '@mui/types';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <MenuItemUnstyled invalidProp={0} />

      <MenuItemUnstyled
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <MenuItemUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <MenuItemUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <MenuItemUnstyled
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <MenuItemUnstyled<'button'>
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
