import * as React from 'react';
import { expectType } from '@mui/types';
import Paper from '@mui/material/Paper';
import GridLegacy, { GridLegacyProps } from '@mui/material/GridLegacy';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: GridLegacyProps<'span'> = {
  component: 'span',
  onChange: (event) => {
    expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
  },
};

const props2: GridLegacyProps = {
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props3: GridLegacyProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props4: GridLegacyProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error
  incorrectProp: 3,
};

// @ts-expect-error
const props5: GridLegacyProps<typeof CustomComponent> = {
  component: CustomComponent,
};

function ResponsiveTest() {
  return (
    <React.Fragment>
      <GridLegacy item xs={12} sm={8} md={5} component={Paper} elevation={6} square />
      <GridLegacy item component={'a'} href="/test" />

      <GridLegacy item component={CustomComponent} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error
        <GridLegacy item component={CustomComponent} />
      }
      <GridLegacy
        item
        component="span"
        onChange={(event) => {
          expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
    </React.Fragment>
  );
}
