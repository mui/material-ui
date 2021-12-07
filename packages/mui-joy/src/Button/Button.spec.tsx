import * as React from 'react';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import Button from '@mui/joy/Button';

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

<Button variant="text">Button</Button>;
<Button variant="outlined">Button</Button>;
<Button variant="light">Button</Button>;
<Button variant="contained">Button</Button>;
// @ts-expect-error no `custom` variant
<Button variant="custom">Button</Button>;

<Button color="primary">Button</Button>;
<Button color="neutral">Button</Button>;
<Button color="danger">Button</Button>;
<Button color="info">Button</Button>;
<Button color="success">Button</Button>;
<Button color="warning">Button</Button>;
// @ts-expect-error no `black` color
<Button color="black">Button</Button>;

<Button size="small">Button</Button>;
<Button size="large">Button</Button>;
// @ts-expect-error no `super` size
<Button size="super">Button</Button>;

<Button radius="xs">Button</Button>;
<Button radius="sm">Button</Button>;
<Button radius="md">Button</Button>;
<Button radius="lg">Button</Button>;
<Button radius="xl">Button</Button>;
// @ts-expect-error no `xxxxl` radius
<Button radius="xxxxl">Button</Button>;

<Button shadow="xs">Button</Button>;
<Button shadow="sm">Button</Button>;
<Button shadow="md">Button</Button>;
<Button shadow="lg">Button</Button>;
<Button shadow="xl">Button</Button>;
// @ts-expect-error no `xxxxl` shadow
<Button shadow="xxxxl">Button</Button>;

<Button component="a" href="/" />;
<Button component={NextLink} href="/" />;
<Button component={MuiLink} href="/" />;

function CustomLink({ children, ...props }: React.PropsWithChildren<JSX.IntrinsicElements['a']>) {
  return <a {...props}>{children}</a>;
}
<Button component={CustomLink} href="/" />;

<Button sx={{ borderRadius: 0 }}>Button</Button>;
