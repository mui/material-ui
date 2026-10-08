import * as React from 'react';
import { expectType } from '@mui/types';
import type { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem, {
  getMenu2CheckboxItemIndicatorUtilityClass,
  menu2CheckboxItemIndicatorClasses,
  Menu2CheckboxItemIndicatorClassKey,
  Menu2CheckboxItemIndicatorClasses,
  // @ts-expect-error The default indicator is private. Use the item's indicator slot.
  Menu2CheckboxItemIndicator,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem, {
  getMenu2RadioItemIndicatorUtilityClass,
  menu2RadioItemIndicatorClasses,
  Menu2RadioItemIndicatorClassKey,
  Menu2RadioItemIndicatorClasses,
  // @ts-expect-error The default indicator is private. Use the item's indicator slot.
  Menu2RadioItemIndicator,
} from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme } from '@mui/material/styles';
// @ts-expect-error Menu2 is intentionally not exported from the root barrel for this POC.
import { Menu2 as RootBarrelMenu2 } from '@mui/material';

expectType<Menu2CheckboxItemIndicatorClasses, typeof menu2CheckboxItemIndicatorClasses>(
  menu2CheckboxItemIndicatorClasses,
);
expectType<Menu2RadioItemIndicatorClasses, typeof menu2RadioItemIndicatorClasses>(
  menu2RadioItemIndicatorClasses,
);
const checkboxIndicatorClassKey: Menu2CheckboxItemIndicatorClassKey = 'checked';
const radioIndicatorClassKey: Menu2RadioItemIndicatorClassKey = 'checked';
getMenu2CheckboxItemIndicatorUtilityClass(checkboxIndicatorClassKey);
getMenu2RadioItemIndicatorUtilityClass(radioIndicatorClassKey);

const indicatorHtmlProps: React.HTMLAttributes<HTMLSpanElement> = { title: 'Indicator' };
<Menu2CheckboxItem slotProps={{ indicator: indicatorHtmlProps }} />;
<Menu2RadioItem value="one" slotProps={{ indicator: indicatorHtmlProps }} />;
<Menu2CheckboxItem slotProps={{ indicator: { 'data-testid': 'indicator' } }} />;
<Menu2RadioItem value="one" slotProps={{ indicator: { 'data-testid': 'indicator' } }} />;
<Menu2CheckboxItem icon={<span />} checkedIcon={<span />} />;
<Menu2RadioItem value="one" icon={<span />} checkedIcon={<span />} />;
<Menu2CheckboxItem icon={null} checkedIcon={false} />;
<Menu2RadioItem value="one" icon={null} checkedIcon={false} />;
// @ts-expect-error Icons must be React nodes, not component types.
<Menu2CheckboxItem icon={() => <span />} />;
// @ts-expect-error Icons must be React nodes, not component types.
<Menu2RadioItem value="one" checkedIcon={() => <span />} />;

createTheme({
  components: {
    // @ts-expect-error Indicator defaults and styles belong to MuiMenu2CheckboxItem.
    MuiMenu2CheckboxItemIndicator: {},
  },
});
createTheme({
  components: {
    // @ts-expect-error Indicator defaults and styles belong to MuiMenu2RadioItem.
    MuiMenu2RadioItemIndicator: {},
  },
});

<Menu2CheckboxItem
  slotProps={{
    indicator: {
      // @ts-expect-error The indicator slot has no nested root slot API.
      slots: { root: 'span' },
    },
  }}
/>;
<Menu2RadioItem
  value="one"
  slotProps={{
    indicator: {
      // @ts-expect-error The indicator slot has no nested root slot API.
      slotProps: { root: { className: 'indicator' } },
    },
  }}
/>;

function Menu2Composition() {
  return (
    <Menu2
      modal={false}
      defaultOpen
      openOnHover
      delay={100}
      closeDelay={0}
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
        root: 'div',
        positioner: 'div',
        paper: 'div',
        list: 'div',
      }}
      slotProps={{
        root: (ownerState) => {
          expectType<boolean | undefined, typeof ownerState.open>(ownerState.open);
          expectType<boolean | undefined, typeof ownerState.modal>(ownerState.modal);
          expectType<boolean | undefined, typeof ownerState.loopFocus>(ownerState.loopFocus);
          return {};
        },
        positioner: (ownerState) => {
          expectType<boolean | undefined, typeof ownerState.open>(ownerState.open);
          return { side: 'bottom', align: 'start', ref: React.createRef<HTMLDivElement>() };
        },
        trigger: { nativeButton: true, className: 'trigger' },
        paper: { elevation: 4 },
        list: { 'data-testid': 'list' },
      }}
    >
      <Menu2Group>
        <Menu2GroupLabel>Menu2Group</Menu2GroupLabel>
        <Menu2Item
          dense
          nativeButton={false}
          slotProps={{
            root: (ownerState) => {
              expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
              // @ts-expect-error Visual selection is not part of the item state.
              expectType<boolean, typeof ownerState.selected>(ownerState.selected);
              return {};
            },
          }}
        >
          Menu2Item
        </Menu2Item>
        <Menu2LinkItem
          href="/profile"
          slotProps={{
            root: (ownerState) => {
              expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
              // @ts-expect-error Visual selection is not part of the link item state.
              expectType<boolean, typeof ownerState.selected>(ownerState.selected);
              return {};
            },
          }}
        >
          Profile
        </Menu2LinkItem>
        <Menu2CheckboxItem
          defaultChecked
          slotProps={{
            root: (ownerState) => {
              expectType<boolean, typeof ownerState.checked>(ownerState.checked);
              expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
              // @ts-expect-error Checkbox items use checked, not selected.
              expectType<boolean, typeof ownerState.selected>(ownerState.selected);
              return {};
            },
            indicator: (ownerState) => {
              expectType<boolean, typeof ownerState.checked>(ownerState.checked);
              expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
              expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
              return {
                component: 'i',
                keepMounted: false,
                sx: { color: 'primary.main' },
                ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
              };
            },
          }}
          nativeButton={false}
          onCheckedChange={(checked, eventDetails) => {
            expectType<boolean, typeof checked>(checked);
            expectType<BaseMenu.CheckboxItem.ChangeEventDetails, typeof eventDetails>(eventDetails);
            eventDetails.cancel();
          }}
        >
          Checkbox
        </Menu2CheckboxItem>
        <Menu2RadioGroup
          defaultValue="one"
          onValueChange={(value, eventDetails) => {
            expectType<any, typeof value>(value);
            expectType<BaseMenu.RadioGroup.ChangeEventDetails, typeof eventDetails>(eventDetails);
            eventDetails.cancel();
          }}
        >
          <Menu2RadioItem
            value="one"
            nativeButton={false}
            slotProps={{
              root: (ownerState) => {
                expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                // @ts-expect-error Radio items use checked, not selected.
                expectType<boolean, typeof ownerState.selected>(ownerState.selected);
                return {};
              },
              indicator: (ownerState) => {
                expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                return {
                  component: 'i',
                  keepMounted: false,
                  sx: { color: 'primary.main' },
                  ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
                };
              },
            }}
          >
            One
          </Menu2RadioItem>
        </Menu2RadioGroup>
        <Menu2Separator />
        <Menu2Submenu
          closeParentOnEsc
          slotProps={{
            root: (ownerState) => {
              expectType<boolean | undefined, typeof ownerState.open>(ownerState.open);
              // @ts-expect-error Disabled state belongs to the explicit submenu trigger.
              expectType<boolean | undefined, typeof ownerState.disabled>(ownerState.disabled);
              return {};
            },
          }}
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

function ControlledMenu2Items() {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('one');

  return (
    <Menu2>
      <Menu2CheckboxItem checked={checked} onCheckedChange={setChecked} />
      <Menu2RadioGroup value={value} onValueChange={setValue}>
        <Menu2RadioItem value="one">One</Menu2RadioItem>
      </Menu2RadioGroup>
    </Menu2>
  );
}

<Menu2CheckboxItem
  // @ts-expect-error Use onCheckedChange(checked, eventDetails) for selection changes.
  onChange={(_event: Event, _checked: boolean, _eventDetails: unknown) => {}}
/>;
<Menu2RadioGroup
  // @ts-expect-error Use onValueChange(value, eventDetails) for selection changes.
  onChange={(_event: Event, _value: string, _eventDetails: unknown) => {}}
/>;

// The root still accepts a DOM change handler.
<Menu2CheckboxItem
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  }}
/>;
<Menu2RadioGroup
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  }}
/>;

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: {
        slots: { backdrop: null },
        modal: false,
        align: 'start',
      },
      // The popup parts are rendered internally, so their overrides live on the
      // collapsed component's slots. The trigger is the caller's element, so it
      // has no slot here.
      styleOverrides: {
        root: {},
        positioner: {},
        backdrop: {},
        paper: {},
        list: {},
      },
      variants: [
        {
          props: { align: 'start' },
          style: {},
        },
        { props: { open: true, modal: false }, style: {} },
      ],
    },
    MuiMenu2Submenu: {
      defaultProps: {
        defaultOpen: false,
      },
      variants: [{ props: { open: true, closeParentOnEsc: false }, style: {} }],
      styleOverrides: {
        root: {},
        positioner: {},
        paper: {},
        list: {},
      },
    },
    MuiMenu2SubmenuTrigger: {
      defaultProps: { openOnHover: false, dense: true, disableRipple: true },
      styleOverrides: {
        root: { [`&.${menu2SubmenuTriggerClasses.highlighted}`]: { color: 'red' } },
      },
      variants: [{ props: { divider: true }, style: {} }],
    },
    MuiMenu2Item: {
      defaultProps: {
        dense: true,
      },
      styleOverrides: {
        root: { [`&.${menu2ItemClasses.highlighted}`]: { color: 'red' } },
      },
      variants: [
        {
          props: { divider: true },
          style: {},
        },
      ],
    },

    MuiMenu2CheckboxItem: {
      defaultProps: {
        slotProps: { indicator: { keepMounted: false, sx: { color: 'primary.main' } } },
      },
      styleOverrides: { indicator: { minWidth: 40 } },
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        slotProps: { indicator: { keepMounted: false, sx: { color: 'primary.main' } } },
      },
      styleOverrides: { indicator: { minWidth: 40 } },
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
  // @ts-expect-error ownerState is internal and cannot be overridden.
  ownerState={{ open: true }}
/>;
<Menu2Submenu
  // @ts-expect-error ownerState is internal and cannot be overridden.
  ownerState={{ open: true }}
/>;

<Menu2Submenu
  // @ts-expect-error Set disabled on the explicit submenu trigger.
  disabled
/>;
<Menu2SubmenuTrigger disabled />;

// Live state is available to theme customization, not as controlled item props.
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2Item highlighted />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2LinkItem highlighted />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2CheckboxItem highlighted />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2RadioItem value="one" highlighted />;
// @ts-expect-error Radio checked state is controlled by its group.
<Menu2RadioItem value="one" checked />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2SubmenuTrigger highlighted />;
// @ts-expect-error The submenu, not its trigger, controls the open state.
<Menu2SubmenuTrigger open />;
<Menu2CheckboxItem
  checked
  onCheckedChange={(checked) => expectType<boolean, typeof checked>(checked)}
/>;

<Menu2 slots={{ backdrop: null }} slotProps={{ backdrop: { sx: { opacity: 0.5 } } }} />;
<Menu2
  // @ts-expect-error Configure the backdrop through slots and slotProps.
  backdrop
/>;
<Menu2Submenu
  // @ts-expect-error There is no top-level backdrop prop.
  backdrop
/>;
<Menu2Submenu
  slots={{
    // @ts-expect-error Only the root menu has a backdrop slot.
    backdrop: 'div',
  }}
/>;
<Menu2Submenu
  slotProps={{
    // @ts-expect-error Only the root menu has backdrop slot props.
    backdrop: {},
  }}
/>;

<Menu2SubmenuTrigger slots={{ indicator: null }}>More</Menu2SubmenuTrigger>;
<Menu2Submenu trigger={<Menu2SubmenuTrigger slots={{ indicator: null }}>More</Menu2SubmenuTrigger>}>
  <Menu2Item>Nested</Menu2Item>
</Menu2Submenu>;

<Menu2
  // @ts-expect-error Popover anchorOrigin is intentionally not supported.
  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
/>;

<Menu2
  // @ts-expect-error Only submenus can close parent menus on Escape.
  closeParentOnEsc
/>;
<Menu2
  // @ts-expect-error The popup does not render an arrow.
  arrowPadding={8}
/>;
<Menu2Submenu
  // @ts-expect-error The submenu popup does not render an arrow.
  arrowPadding={8}
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
      // @ts-expect-error Exit timing is internal to the submenu.
      expectType<boolean, typeof state.closing>(state.closing);
      // @ts-expect-error Exit tint handling is internal to the submenu.
      expectType<boolean, typeof state.retainClosingTint>(state.retainClosingTint);
      expectType<boolean, typeof state.highlighted>(state.highlighted);
      // @ts-expect-error Visual selection is not part of the submenu trigger state.
      expectType<boolean, typeof state.selected>(state.selected);
      return { 'data-open': state.open };
    },
    indicator: (state) => {
      expectType<boolean, typeof state.open>(state.open);
      // @ts-expect-error Exit timing is internal to the submenu.
      expectType<boolean, typeof state.closing>(state.closing);
      // @ts-expect-error Exit tint handling is internal to the submenu.
      expectType<boolean, typeof state.retainClosingTint>(state.retainClosingTint);
      expectType<boolean, typeof state.highlighted>(state.highlighted);
      return {
        children: <span>Custom</span>,
        ref: React.createRef<HTMLSpanElement>(),
        sx: { color: 'primary.main' },
      };
    },
  }}
/>;

<Menu2SubmenuTrigger
  // @ts-expect-error Submenu triggers never close the parent on activation.
  closeOnClick
/>;

// Menu2 uses checkbox and radio items to represent a checked value.
// @ts-expect-error Menu2Item has no visual selected state.
<Menu2Item selected />;
// @ts-expect-error Menu2LinkItem has no visual selected state.
<Menu2LinkItem selected />;
// @ts-expect-error Menu2CheckboxItem uses checked, not selected.
<Menu2CheckboxItem selected />;
// @ts-expect-error Menu2RadioItem uses checked, not selected.
<Menu2RadioItem value="one" selected />;
// @ts-expect-error Menu2SubmenuTrigger has no visual selected state.
<Menu2SubmenuTrigger selected />;

// @ts-expect-error Menu2Item has no selected class.
<Menu2Item classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2LinkItem has no selected class.
<Menu2LinkItem classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2CheckboxItem has no selected class.
<Menu2CheckboxItem classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2RadioItem has no selected class.
<Menu2RadioItem value="one" classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2SubmenuTrigger has no selected class.
<Menu2SubmenuTrigger classes={{ selected: 'selected' }} />;

// @ts-expect-error Exit timing has no public class.
<Menu2SubmenuTrigger classes={{ closing: 'closing' }} />;

createTheme({
  components: {
    MuiMenu2SubmenuTrigger: {
      styleOverrides: {
        // @ts-expect-error Exit timing has no public style override.
        closing: { backgroundColor: 'red' },
      },
    },
  },
});

<Menu2
  transitionDuration={{ enter: 200, exit: 150 }}
  slots={{
    transition: null,
  }}
/>;

<Menu2Submenu transitionDuration="auto" slotProps={{ transition: { easing: 'linear' } }} />;

<Menu2
  slotProps={{
    transition: {
      // @ts-expect-error Base UI owns completion; use onOpenChangeComplete.
      onExited: () => {},
    },
  }}
/>;

<Menu2
  slotProps={{
    transition: {
      // @ts-expect-error Base UI owns the popup mounting lifecycle.
      unmountOnExit: true,
    },
  }}
/>;

<Menu2
  // @ts-expect-error Base UI render prop is intentionally not supported.
  render={<button aria-label="Options" type="button" />}
/>;

<Menu2
  slotProps={{
    root: {
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

<Menu2
  trigger={<button type="button">Open</button>}
  slotProps={{
    // @ts-expect-error The hover props live on Menu2, not on the trigger slot.
    trigger: { openOnHover: true },
  }}
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2
  trigger={<button type="button">Open</button>}
  slotProps={{
    // @ts-expect-error The trigger element owns its own props.
    trigger: { variant: 'outlined' },
  }}
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2
  trigger={<button type="button">Open</button>}
  slots={{
    // @ts-expect-error The popup renders as the Paper slot. There is no popup slot.
    popup: 'div',
  }}
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2
  trigger={<button type="button">Open</button>}
  slotProps={{
    // @ts-expect-error The portal is internal. Use top-level container and keepMounted.
    portal: { className: 'portal' },
  }}
>
  <Menu2Item>Item</Menu2Item>
</Menu2>;

<Menu2
  slots={{
    positioner: 'div',
  }}
  slotProps={{
    root: { ref: React.createRef<HTMLDivElement>(), sx: { zIndex: 1600 } },
    positioner: { side: 'bottom', sideOffset: 8, sx: { outline: '1px solid' } },
  }}
/>;

<Menu2Submenu
  slotProps={{
    positioner: { align: 'start', ref: React.createRef<HTMLDivElement>() },
  }}
/>;

<Menu2
  slotProps={{
    positioner: {
      // @ts-expect-error Base UI render prop is intentionally not supported.
      render: <div />,
    },
  }}
/>;

<Menu2 trigger={<button type="button">Open</button>}>
  <Menu2Submenu
    // @ts-expect-error A submenu is always vertical.
    orientation="horizontal"
    trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
  >
    <Menu2Item>Item</Menu2Item>
  </Menu2Submenu>
</Menu2>;

// The ref and the HTML attributes follow the `component` prop, the same as the
// classic parts.
<Menu2 trigger={<button type="button">Open</button>}>
  <Menu2Item ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)}>Item</Menu2Item>
  <Menu2Item component="li" ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)}>
    List item
  </Menu2Item>
  <Menu2Item component="a" href="/anchor">
    Anchor attributes
  </Menu2Item>
  <Menu2LinkItem
    href="/profile"
    ref={(node) => expectType<HTMLAnchorElement | null, typeof node>(node)}
  >
    Link
  </Menu2LinkItem>
  <Menu2CheckboxItem
    slotProps={{
      indicator: {
        ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
      },
    }}
  >
    Checkbox
  </Menu2CheckboxItem>
  <Menu2Separator ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
  <Menu2Submenu
    trigger={
      <Menu2SubmenuTrigger
        component="li"
        ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)}
      >
        More
      </Menu2SubmenuTrigger>
    }
  >
    <Menu2Item>Nested</Menu2Item>
  </Menu2Submenu>
</Menu2>;

<Menu2 trigger={<button type="button">Open</button>}>
  {/* @ts-expect-error `href` is an anchor attribute, and the default root is a div. */}
  <Menu2Item href="/anchor">Item</Menu2Item>
</Menu2>;
