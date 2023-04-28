import * as React from 'react';
import { expectType } from '@mui/types';
import Menu from '@mui/base/Menu';

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Menu invalidProp={0} />

      <Menu component="a" href="#" />

      <Menu component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Menu component={CustomComponent} />

      <Menu
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Menu<'button'>
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
