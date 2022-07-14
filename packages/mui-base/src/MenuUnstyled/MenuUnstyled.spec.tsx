import * as React from 'react';
import { expectType } from '@mui/types';
import MenuUnstyled from '@mui/base/MenuUnstyled';

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <MenuUnstyled invalidProp={0} />

      <MenuUnstyled component="a" href="#" />

      <MenuUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <MenuUnstyled component={CustomComponent} />

      <MenuUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <MenuUnstyled<'button'>
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
