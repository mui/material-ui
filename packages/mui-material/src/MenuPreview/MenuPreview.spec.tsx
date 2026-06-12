import * as React from 'react';
import { expectType } from '@mui/types';
import Button from '@mui/material/Button';
import Menu, {
  CheckboxItem,
  CheckboxItemIndicator,
  Group,
  GroupLabel,
  Item,
  LinkItem,
  Popup,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Separator,
  SubmenuPopup,
  SubmenuRoot,
  SubmenuTrigger,
  Trigger,
} from '@mui/material/MenuPreview';
import { createTheme } from '@mui/material/styles';
// @ts-expect-error MenuPreview is intentionally not exported from the root barrel for this POC.
import { MenuPreview as RootBarrelMenuPreview } from '@mui/material';

function MenuPreviewComposition() {
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
      <Trigger render={<Button />} openOnHover delay={100}>
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
          <Item dense selected>
            Item
          </Item>
          <LinkItem href="/profile">Profile</LinkItem>
          <CheckboxItem defaultChecked>
            <CheckboxItemIndicator keepMounted />
            Checkbox
          </CheckboxItem>
          <RadioGroup defaultValue="one">
            <RadioItem value="one">
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
            <SubmenuTrigger openOnHover>More</SubmenuTrigger>
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
    MuiMenuPreview: {
      defaultProps: {
        modal: false,
      },
    },
    MuiMenuPreviewSubmenuRoot: {
      defaultProps: {
        defaultOpen: false,
      },
    },
    MuiMenuPreviewItem: {
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
    MuiMenuPreviewPopup: {
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
    MuiMenuPreviewRadioItem: {
      variants: [
        {
          props: { value: 'small' },
          style: {},
        },
      ],
    },
    MuiMenuPreviewLinkItem: {
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
