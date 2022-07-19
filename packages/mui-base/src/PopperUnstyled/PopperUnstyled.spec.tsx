import * as React from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { expectType } from '@mui/types';

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <PopperUnstyled invalidProp={0} open />

      <PopperUnstyled open component="a" href="#" />

      <PopperUnstyled open component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <PopperUnstyled open component={CustomComponent} />

      <PopperUnstyled
        open
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <PopperUnstyled<'button'>
        open
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
