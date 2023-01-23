import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { expectType } from '@mui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const TestComponent = () => {
  return (
    <>
      <MenuItem />
      <MenuItem component={'a'} href="/test" />

      <MenuItem component={CustomComponent} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error
        <MenuItem component={CustomComponent} />
      }
      <MenuItem
        onChange={(event) => {
          expectType<React.FormEvent<HTMLLIElement>, typeof event>(event);
        }}
      />
      <MenuItem
        component="span"
        onChange={(event) => {
          expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
    </>
  );
};
