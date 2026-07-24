import * as React from 'react';
import { expectType } from '@mui/types';
import Menu from '@mui/material/Unstable_Menu2';
import CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import CheckboxItemIndicator from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Group from '@mui/material/Unstable_Menu2Group';
import GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Item from '@mui/material/Unstable_Menu2Item';
import LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Popup from '@mui/material/Unstable_Menu2Popup';
import RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import RadioItemIndicator from '@mui/material/Unstable_Menu2RadioItemIndicator';
import Separator from '@mui/material/Unstable_Menu2Separator';
import SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Trigger from '@mui/material/Unstable_Menu2Trigger';
import { createTheme } from '@mui/material/styles';
// @ts-expect-error Menu2 is intentionally not exported from the root barrel for this POC.
import { Menu2 as RootBarrelMenu2 } from '@mui/material';

function Menu2Composition() {
  return (
    <Menu
      modal={false}
      defaultOpen
      onOpenChange={(open, eventDetails) => {
        expectType<boolean, typeof open>(open);
        eventDetails.cancel();
        eventDetails.preventUnmountOnClose();
      }}
    >
      <Trigger variant="contained" openOnHover delay={100} nativeButton>
        Options
      </Trigger>
      <Popup
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
        <Group>
          <GroupLabel>Group</GroupLabel>
          <Item dense selected nativeButton={false}>
            Item
          </Item>
          <LinkItem href="/profile">Profile</LinkItem>
          <CheckboxItem
            defaultChecked
            nativeButton={false}
            onChange={(event, checked, eventDetails) => {
              expectType<Event, typeof event>(event);
              expectType<boolean, typeof checked>(checked);
              eventDetails.cancel();
            }}
          >
            <CheckboxItemIndicator keepMounted />
            Checkbox
          </CheckboxItem>
          <RadioGroup
            defaultValue="one"
            onChange={(event, value, eventDetails) => {
              expectType<Event, typeof event>(event);
              expectType<any, typeof value>(value);
              eventDetails.cancel();
            }}
          >
            <RadioItem value="one" nativeButton={false}>
              <RadioItemIndicator keepMounted />
              One
            </RadioItem>
          </RadioGroup>
          <Separator />
          <SubmenuRoot
            onOpenChange={(open, eventDetails) => {
              expectType<boolean, typeof open>(open);
              eventDetails.cancel();
            }}
          >
            <SubmenuTrigger openOnHover nativeButton={false}>
              More
            </SubmenuTrigger>
            <SubmenuPopup sideOffset={2}>
              <Item>Nested</Item>
            </SubmenuPopup>
          </SubmenuRoot>
        </Group>
      </Popup>
    </Menu>
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

<Popup
  // @ts-expect-error Popover anchorOrigin is intentionally not supported.
  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
/>;

<Popup
  slots={{
    // @ts-expect-error Popover transition slot is intentionally not supported.
    transition: 'div',
  }}
/>;

<Trigger
  // @ts-expect-error Base UI render prop is intentionally not supported.
  render={<button aria-label="Options" type="button" />}
>
  Options
</Trigger>;

<Trigger
  // @ts-expect-error Menu2Trigger cannot be rendered as a link.
  href="/profile"
>
  Options
</Trigger>;

<Popup
  slotProps={{
    popup: {
      // @ts-expect-error Base UI render prop is intentionally not supported.
      render: <div />,
    },
  }}
/>;
