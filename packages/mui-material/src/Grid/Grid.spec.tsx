import * as React from 'react';
import { expectType } from '@mui/types';
import Paper from '@mui/material/Paper';
import Grid, { GridProps } from '@mui/material/Grid';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: GridProps<'span'> = {
  component: 'span',
  onChange: (event) => {
    expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
  },
};

const props2: GridProps = {
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props3: GridProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props4: GridProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error
  incorrectProp: 3,
};

// @ts-expect-error
const props5: GridProps<typeof CustomComponent> = {
  component: CustomComponent,
};

function ResponsiveTest() {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square />
      <Grid item component={'a'} href="/test" />

      <Grid item component={CustomComponent} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error
        <Grid item component={CustomComponent} />
      }
      <Grid
        item
        component="span"
        onChange={(event) => {
          expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
    </React.Fragment>
  );
}
