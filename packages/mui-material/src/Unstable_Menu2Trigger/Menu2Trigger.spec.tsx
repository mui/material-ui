import * as React from 'react';
import { expectType } from '@mui/types';
import Button from '@mui/material/Button';
import type { Menu2TriggerProps } from '@mui/material/Unstable_Menu2Trigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import { createTheme } from '@mui/material/styles';
import {
  // @ts-expect-error Menu2Trigger is not exported from the root barrel for this POC.
  Menu2Trigger as RootBarrelMenu2Trigger,
} from '@mui/material';

<Menu2Trigger
  id="profile-trigger"
  className="profile-trigger"
  title="Profile actions"
  aria-label="Profile actions"
  data-testid="profile-trigger"
  disabled={false}
  nativeButton
  openOnHover
  delay={100}
  closeDelay={50}
  ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
>
  <Button variant="outlined" size="small" sx={{ color: 'primary.main' }}>
    Profile
  </Button>
</Menu2Trigger>;

<Menu2Trigger>
  <button type="button">Profile</button>
</Menu2Trigger>;

<Menu2Trigger nativeButton={false} ref={React.createRef<HTMLAnchorElement>()}>
  <a href="/profile">Profile</a>
</Menu2Trigger>;

const triggerProps: Menu2TriggerProps = {
  children: <button type="button">Profile</button>,
  onClick: (event) => {
    expectType<EventTarget & HTMLElement, typeof event.currentTarget>(event.currentTarget);
  },
};
<Menu2Trigger {...triggerProps} ref={React.createRef<HTMLButtonElement>()} />;

createTheme({
  components: {
    MuiMenu2Trigger: {
      defaultProps: {
        openOnHover: true,
        delay: 200,
        closeDelay: 100,
        nativeButton: false,
        disabled: false,
        className: 'menu-trigger',
      },
    },
  },
});

createTheme({
  components: {
    MuiMenu2Trigger: {
      // @ts-expect-error The child component owns the trigger styles.
      styleOverrides: { root: { color: 'red' } },
    },
  },
});

createTheme({
  components: {
    MuiMenu2Trigger: {
      // @ts-expect-error The child component owns the trigger variants.
      variants: [],
    },
  },
});

<Menu2Trigger
  // @ts-expect-error Detached triggers are not part of the Menu2 API.
  handle={{}}
>
  <button type="button">Profile</button>
</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error Trigger payloads are not part of the Menu2 API.
  payload={{ id: 1, label: 'Profile' }}
>
  <button type="button">Profile</button>
</Menu2Trigger>;

// @ts-expect-error A trigger wraps one element.
<Menu2Trigger />;
// @ts-expect-error A trigger cannot wrap plain text.
<Menu2Trigger>Profile</Menu2Trigger>;
// @ts-expect-error A trigger cannot wrap null.
<Menu2Trigger>{null}</Menu2Trigger>;
// @ts-expect-error A trigger cannot wrap several elements.
<Menu2Trigger>
  <button type="button">One</button>
  <button type="button">Two</button>
</Menu2Trigger>;
// @ts-expect-error A trigger wraps an element, not a render callback.
<Menu2Trigger>{() => <button type="button">Profile</button>}</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error Set visual props on the child button.
  variant="outlined"
>
  <button type="button">Profile</button>
</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error Set sx on the child component.
  sx={{ color: 'primary.main' }}
>
  <Button>Profile</Button>
</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error The child determines the element type.
  component="button"
>
  <button type="button">Profile</button>
</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error Use children instead of the Base UI render prop.
  render={<button type="button">Profile</button>}
>
  <button type="button">Profile</button>
</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error The ref points to a DOM element.
  ref={React.createRef<SVGSVGElement>()}
>
  <button type="button">Profile</button>
</Menu2Trigger>;
