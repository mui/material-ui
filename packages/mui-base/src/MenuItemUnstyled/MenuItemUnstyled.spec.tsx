import * as React from 'react';
import { expectType } from '@mui/types';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <MenuItemUnstyled invalidProp={0} />

      <MenuItemUnstyled component="a" href="#" />

      <MenuItemUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <MenuItemUnstyled component={CustomComponent} />

      <MenuItemUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <MenuItemUnstyled<'button'>
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
