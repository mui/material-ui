import * as React from 'react';
import { expectType } from '@mui/types';
import MenuUnstyled from '@mui/base/MenuUnstyled';

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <MenuUnstyled invalidProp={0} />

      <MenuUnstyled
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <MenuUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <MenuUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <MenuUnstyled
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <MenuUnstyled<'button'>
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
