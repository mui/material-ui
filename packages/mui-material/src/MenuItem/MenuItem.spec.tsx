import * as React from 'react';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { expectType } from '@mui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props: MenuItemProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: MenuItemProps = {
  onChange: (event) => {
    expectType<React.FormEvent<HTMLLIElement>, typeof event>(event);
  },
};

const props3: MenuItemProps<'span'> = {
  // @ts-expect-error
  component: 'div',
};

const props4: MenuItemProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props5: MenuItemProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error
  inCorrectProp: 3,
};

// @ts-expect-error
const props6: MenuItemProps<typeof CustomComponent> = {
  component: CustomComponent,
};

const TestComponent = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
