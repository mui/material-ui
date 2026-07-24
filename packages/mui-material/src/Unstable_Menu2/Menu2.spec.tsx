import * as React from 'react';
import { expectType } from '@mui/types';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItemIndicator from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItemIndicator from '@mui/material/Unstable_Menu2RadioItemIndicator';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
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
    >
      <Menu2Trigger variant="contained" openOnHover delay={100} nativeButton>
        Options
      </Menu2Trigger>
      <Menu2Popup
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
            <Menu2CheckboxItemIndicator keepMounted />
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
              <Menu2RadioItemIndicator keepMounted />
              One
            </Menu2RadioItem>
          </Menu2RadioGroup>
          <Menu2Separator />
          <Menu2SubmenuRoot
            onOpenChange={(open, eventDetails) => {
              expectType<boolean, typeof open>(open);
              eventDetails.cancel();
            }}
          >
            <Menu2SubmenuTrigger openOnHover nativeButton={false}>
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup sideOffset={2}>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2SubmenuRoot>
        </Menu2Group>
      </Menu2Popup>
    </Menu2>
  );
}

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: {
        modal: false,
      },
    },
    MuiMenu2SubmenuRoot: {
      defaultProps: {
        defaultOpen: false,
      },
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
    MuiMenu2Popup: {
      defaultProps: {
        align: 'start',
      },
      styleOverrides: {
        root: {},
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

<Menu2Popup
  // @ts-expect-error Popover anchorOrigin is intentionally not supported.
  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
/>;

<Menu2Popup
  slots={{
    // @ts-expect-error Popover transition slot is intentionally not supported.
    transition: 'div',
  }}
/>;

<Menu2Trigger
  // @ts-expect-error Base UI render prop is intentionally not supported.
  render={<button aria-label="Options" type="button" />}
>
  Options
</Menu2Trigger>;

<Menu2Trigger
  // @ts-expect-error Menu2Trigger cannot be rendered as a link.
  href="/profile"
>
  Options
</Menu2Trigger>;

<Menu2Popup
  slotProps={{
    popup: {
      // @ts-expect-error Base UI render prop is intentionally not supported.
      render: <div />,
    },
  }}
/>;
