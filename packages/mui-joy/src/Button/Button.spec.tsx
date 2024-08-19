import * as React from 'react';
import NextLink from 'next/link';
import JoyLink from '@mui/material/Link';
import { expectType } from '@mui/types';
import Button, { ButtonOwnerState } from '@mui/joy/Button';

<Button>Button</Button>;

function handleClick(event: React.MouseEvent) {}
<Button onClick={handleClick}>Button</Button>;

function handleClick2(event: React.MouseEvent<HTMLAnchorElement>) {}
<Button onClick={handleClick2}>Button</Button>;

function handleClick3(event: React.MouseEvent<HTMLButtonElement>) {}
<Button onClick={handleClick3}>Button</Button>;

function handleClick4(event: React.MouseEvent<HTMLDivElement>) {}
// @ts-expect-error should be HTMLAnchorElement | HTMLButtonElement
<Button onClick={handleClick4}>Button</Button>;

<Button variant="plain">Button</Button>;
<Button variant="outlined">Button</Button>;
<Button variant="soft">Button</Button>;
<Button variant="solid">Button</Button>;
// @ts-expect-error no `custom` variant
<Button variant="custom">Button</Button>;

<Button color="primary">Button</Button>;
<Button color="neutral">Button</Button>;
<Button color="danger">Button</Button>;
<Button color="success">Button</Button>;
<Button color="warning">Button</Button>;
// @ts-expect-error no `black` color
<Button color="black">Button</Button>;

<Button size="sm">Button</Button>;
<Button size="lg">Button</Button>;
// @ts-expect-error no `super` size
<Button size="super">Button</Button>;

<Button component="a" href="/" />;
<Button component={NextLink} href="/" />;
<Button component={JoyLink} href="/" />;

function CustomLink({
  children,
  to,
  ...props
}: React.PropsWithChildren<{ to: string } & Omit<React.JSX.IntrinsicElements['a'], 'href'>>) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}

// @ts-expect-error missing `to`
<Button component={CustomLink} />;

// @ts-expect-error href is not allowed
<Button component={CustomLink} to="/" href="/" />;

<Button sx={{ borderRadius: 0 }}>Button</Button>;

function Icon() {
  return null;
}

<Button sx={{ width: 'var(--Button-minHeight)' }}>
  <Icon />
</Button>;
<Button
  variant="solid"
  color="success"
  endDecorator={<Icon />}
  sx={{ width: 'var(--Button-minHeight)' }}
>
  <Icon />
</Button>;
<Button variant="solid" startDecorator={<Icon />} size="sm">
  Add to cart
</Button>;
<Button variant="outlined" endDecorator={<Icon />} color="success">
  Checkout
</Button>;

<Button loading variant="outlined" disabled>
  disabled
</Button>;
<Button loading loadingIndicator="Loading…" variant="outlined">
  Fetch data
</Button>;
<Button endDecorator={<Icon />} loading loadingPosition="end">
  Send
</Button>;
<Button loading loadingPosition="start" startDecorator={<Icon />}>
  Save
</Button>;

<Button
  slots={{
    root: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
    loadingIndicatorCenter: 'div',
  }}
/>;

<Button
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    startDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    endDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    loadingIndicatorCenter: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Button
  slotProps={{
    root: (ownerState) => {
      expectType<ButtonOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<ButtonOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<ButtonOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    loadingIndicatorCenter: (ownerState) => {
      expectType<ButtonOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
