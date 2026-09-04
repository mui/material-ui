import * as React from 'react';
import { expectType } from '@mui/types';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItemIndicator from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItemIndicator from '@mui/material/Unstable_Menu2RadioItemIndicator';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme } from '@mui/material/styles';
// @ts-expect-error Menu2 is intentionally not exported from the root barrel for this POC.
import { Menu2 as RootBarrelMenu2 } from '@mui/material';

function Menu2Composition() {
  return (
    <Menu2
      modal={false}
      defaultOpen
      onOpenChange={(open, eventDetails) => {
        expectType<boolean, typeof open>(open);
        eventDetails.cancel();
        eventDetails.preventUnmountOnClose();
      }}
      trigger={<button type="button">Options</button>}
      anchor={null}
      side="bottom"
      align="start"
      sideOffset={4}
      collisionPadding={8}
      keepMounted
      finalFocus
      slots={{
        portal: 'div',
        positioner: 'div',
        popup: 'div',
        paper: 'div',
        list: 'div',
      }}
      slotProps={{
        trigger: { openOnHover: true, delay: 100 },
        paper: { elevation: 4 },
        list: { 'data-testid': 'list' },
      }}
    >
      <Menu2Group>
        <Menu2GroupLabel>Menu2Group</Menu2GroupLabel>
        <Menu2Item dense selected nativeButton={false}>
          Menu2Item
        </Menu2Item>
        <Menu2LinkItem href="/profile">Profile</Menu2LinkItem>
        <Menu2CheckboxItem
          defaultChecked
          nativeButton={false}
          onChange={(event, checked, eventDetails) => {
            expectType<Event, typeof event>(event);
            expectType<boolean, typeof checked>(checked);
            eventDetails.cancel();
          }}
        >
          Checkbox
        </Menu2CheckboxItem>
        <Menu2RadioGroup
          defaultValue="one"
          onChange={(event, value, eventDetails) => {
            expectType<Event, typeof event>(event);
            expectType<any, typeof value>(value);
            eventDetails.cancel();
          }}
        >
          <Menu2RadioItem value="one" nativeButton={false}>
            One
          </Menu2RadioItem>
        </Menu2RadioGroup>
        <Menu2Separator />
        <Menu2Submenu
          onOpenChange={(open, eventDetails) => {
            expectType<boolean, typeof open>(open);
            eventDetails.cancel();
          }}
          trigger={
            <Menu2SubmenuTrigger openOnHover nativeButton={false}>
              More
            </Menu2SubmenuTrigger>
          }
          sideOffset={2}
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2Group>
    </Menu2>
  );
}

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: {
        modal: false,
        align: 'start',
      },
      // The popup parts are rendered internally, so their overrides live on the
      // collapsed component's slots. The trigger is the caller's element, so it
      // has no slot here.
      styleOverrides: {
        root: {},
        backdrop: {},
        paper: {},
        list: {},
      },
      variants: [
        {
          props: { align: 'start' },
          style: {},
        },
      ],
    },
    MuiMenu2Submenu: {
      defaultProps: {
        defaultOpen: false,
      },
      styleOverrides: {
        root: {},
        paper: {},
        list: {},
      },
    },
    MuiMenu2SubmenuTrigger: {
      defaultProps: { openOnHover: false, dense: true, disableRipple: true },
      styleOverrides: { root: {}, highlighted: {} },
      variants: [{ props: { selected: true }, style: {} }],
    },
    MuiMenu2Item: {
      defaultProps: {
        dense: true,
      },
      styleOverrides: {
        root: {},
        highlighted: {},
      },
      variants: [
        {
          props: { selected: true },
          style: {},
        },
      ],
    },

    MuiMenu2RadioItem: {
      variants: [
        {
          props: { value: 'small' },
          style: {},
        },
      ],
    },
    MuiMenu2LinkItem: {
      variants: [
        {
          props: { href: '/profile' },
          style: {},
        },
      ],
    },
  },
});

<Menu2
  // @ts-expect-error Popover anchorOrigin is intentionally not supported.
  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
/>;

<Menu2Submenu
  slotProps={{
    // @ts-expect-error Configure the explicit Menu2SubmenuTrigger directly.
    trigger: { openOnHover: false },
  }}
/>;

<Menu2SubmenuTrigger
  slotProps={{
    root: (state) => {
      expectType<boolean, typeof state.open>(state.open);
      expectType<boolean, typeof state.highlighted>(state.highlighted);
      return { 'data-open': state.open };
    },
  }}
/>;

<Menu2SubmenuTrigger
  // @ts-expect-error Submenu triggers never close the parent on activation.
  closeOnClick
/>;

<Menu2
  slots={{
    // @ts-expect-error Popover transition slot is intentionally not supported.
    transition: 'div',
  }}
/>;

<Menu2
  // @ts-expect-error Base UI render prop is intentionally not supported.
  render={<button aria-label="Options" type="button" />}
/>;

<Menu2
  slotProps={{
    popup: {
      // @ts-expect-error Base UI render prop is intentionally not supported.
      render: <div />,
    },
  }}
/>;

// One element per prop: TypeScript reports one excess prop per element.
<Menu2
  // @ts-expect-error `handle` needs `Menu.createHandle`, which Menu2 does not export.
  handle={undefined}
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2
  // @ts-expect-error Detached triggers are outside the Menu2 contract.
  triggerId="detached"
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2
  // @ts-expect-error Menu2 is always vertical.
  orientation="horizontal"
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2 trigger={<button type="button">Open</button>}>
  <Menu2Submenu
    // @ts-expect-error A submenu is always vertical.
    orientation="horizontal"
    trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
  >
    <Menu2Item>Item</Menu2Item>
  </Menu2Submenu>
</Menu2>;
