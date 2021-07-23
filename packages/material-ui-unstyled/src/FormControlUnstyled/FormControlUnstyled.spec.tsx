import * as React from 'react';
import FormControlUnstyled from '@material-ui/unstyled/FormControlUnstyled';
import { expectType } from '@material-ui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

const FormControlUnstyledTest = () => (
  <div>
    <FormControlUnstyled focused />
    {/* @ts-expect-error */}
    <FormControlUnstyled invalidProp={0} />

    <FormControlUnstyled component="a" href="#" />

    <FormControlUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
    {/* @ts-expect-error */}
    <FormControlUnstyled component={CustomComponent} />

    <FormControlUnstyled
      component="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
    />

    <FormControlUnstyled<'button'>
      component="button"
      ref={(elem) => {
        expectType<HTMLButtonElement | null, typeof elem>(elem);
      }}
      onClick={(e) => {
        expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
        e.currentTarget.checkValidity();
      }}
    />
  </div>
);
