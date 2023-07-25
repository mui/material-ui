import * as React from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import { expectType } from '@mui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: PaperProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: PaperProps = {
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props3: PaperProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props4: PaperProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error
  incorrectProp: 3,
};

// @ts-expect-error
const props5: PaperProps<typeof CustomComponent> = {
  component: CustomComponent,
};

function PaperTest() {
  return (
    <div>
      <Paper elevation={4} />
      <Paper component="a" href="test" />

      <Paper component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Paper component={CustomComponent} />
    </div>
  );
}
