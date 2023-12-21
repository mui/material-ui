import * as React from 'react';
import { expectType } from '@mui/types';
import Option, { OptionProps } from '@mui/material-next/Option';
import Link from '@mui/material/Link';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: OptionProps<'div'> = {
  component: 'div',
  value: 1,
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: OptionProps = {
  value: 2,
  onChange: (event) => {
    expectType<React.FormEvent<HTMLLIElement>, typeof event>(event);
  },
};

const props3: OptionProps<typeof CustomComponent> = {
  component: CustomComponent,
  value: 3,
  stringProp: '2',
  numberProp: 2,
};

const props4: OptionProps<typeof CustomComponent> = {
  component: CustomComponent,
  value: 4,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error CustomComponent does not accept incorrectProp
  incorrectProp: 3,
};

// @ts-expect-error missing props
const props5: OptionProps<typeof CustomComponent> = {
  component: CustomComponent,
  value: 5,
};

const TestComponent = () => {
  return (
    <React.Fragment>
      <Option value={1} />
      <Option component={'a'} value={2} href="/test" />

      <Option component={CustomComponent} value={3} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error missing props
        <Option component={CustomComponent} value={4} />
      }
      <Option
        value={5}
        onChange={(event) => {
          expectType<React.FormEvent<HTMLLIElement>, typeof event>(event);
        }}
      />
      <Option
        component="span"
        value={6}
        onChange={(event) => {
          expectType<React.FormEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
      <Option component={Link} value={7} />
    </React.Fragment>
  );
};
