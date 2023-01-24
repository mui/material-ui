import * as React from 'react';
import Link, { LinkProps } from '@mui/material/Link';
import { expectType } from '@mui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: LinkProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.FormEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: LinkProps = {
  onChange: (event) => {
    expectType<React.FormEvent<HTMLAnchorElement>, typeof event>(event);
  },
};

const props3: LinkProps<'span'> = {
  // @ts-expect-error
  component: 'div',
};

const props4: LinkProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '1',
  numberProp: 2,
};

const props5: LinkProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error
  inCorrectProp: 3,
};

// @ts-expect-error
const props6: LinkProps<typeof CustomComponent> = {
  component: CustomComponent,
};

<Link
  ref={(elem) => {
    expectType<HTMLAnchorElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;

<Link
  component="button"
  ref={(elem) => {
    expectType<HTMLButtonElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;

<Link
  component="button"
  ref={(elem: HTMLButtonElement | null) => {
    expectType<HTMLButtonElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;
