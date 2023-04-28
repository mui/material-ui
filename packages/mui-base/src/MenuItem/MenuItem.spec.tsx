import * as React from 'react';
import { expectType } from '@mui/types';
import MenuItem from '@mui/base/MenuItem';

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <MenuItem invalidProp={0} />

      <MenuItem component="a" href="#" />

      <MenuItem component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <MenuItem component={CustomComponent} />

      <MenuItem
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <MenuItem<'button'>
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
