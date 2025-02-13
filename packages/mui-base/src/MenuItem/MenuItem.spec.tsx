import * as React from 'react';
import { expectType } from '@mui/types';
import { MenuItem } from '@mui/base/MenuItem';

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <MenuItem invalidProp={0} />

      <MenuItem<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <MenuItem<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />

      {/* @ts-expect-error required props not specified */}
      <MenuItem<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <MenuItem<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          event.currentTarget.checkValidity()
        }
      />

      <MenuItem<'button'>
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(event) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof event>(event);
          event.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
