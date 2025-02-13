import * as React from 'react';
import { expectType } from '@mui/types';
import { Menu } from '@mui/base/Menu';

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Menu invalidProp={0} />

      <Menu<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Menu<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />

      {/* @ts-expect-error required props not specified */}
      <Menu<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Menu<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          event.currentTarget.checkValidity()
        }
      />

      <Menu<'button'>
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
