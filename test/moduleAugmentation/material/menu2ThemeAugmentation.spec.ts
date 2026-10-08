import type {} from '@mui/material/Unstable_Menu2/themeAugmentation';
import * as React from 'react';
import { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import {
  menu2CheckboxItemClasses,
  menu2CheckboxItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import { menu2RadioGroupClasses } from '@mui/material/Unstable_Menu2RadioGroup';
import { menu2SubmenuTriggerClasses } from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme, Components, ComponentsOverrides } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    menu2TestColor: string;
  }
  interface ThemeOptions {
    menu2TestColor?: string;
  }
}

createTheme({
  menu2TestColor: 'red',
  components: {
    MuiMenu2: {
      defaultProps: { modal: false, align: 'start', slots: { backdrop: null } },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          ownerState.open satisfies boolean | undefined;
          // @ts-expect-error Menu2 owner state retains the prop types.
          ownerState.open satisfies string;
          theme.menu2TestColor satisfies string;
          return { color: theme.menu2TestColor };
        },
        backdrop: {},
        paper: {},
        list: {},
      },
      variants: [
        { props: { align: 'start' }, style: ({ theme }) => ({ color: theme.menu2TestColor }) },
        {
          props: ({ ownerState }) => {
            ownerState.align satisfies 'start' | 'center' | 'end' | undefined;
            return ownerState.open === true;
          },
          style: {},
        },
      ],
    },
    MuiMenu2Submenu: {
      defaultProps: { closeParentOnEsc: true },
      styleOverrides: { root: {}, paper: {}, list: {} },
      variants: [{ props: { open: true }, style: {} }],
    },
    MuiMenu2SubmenuTrigger: {
      defaultProps: { openOnHover: false },
      styleOverrides: {
        root: {
          [`&.${menu2SubmenuTriggerClasses.open}`]: { color: 'red' },
          variants: [
            { props: { open: true, highlighted: true }, style: { color: 'red' } },
            {
              props: ({ open, highlighted, ownerState }) => {
                open satisfies boolean;
                highlighted satisfies boolean;
                ownerState.open satisfies boolean;
                ownerState.highlighted satisfies boolean;
                return open && !highlighted;
              },
              style: ({ theme }) => ({ color: theme.menu2TestColor }),
            },
          ],
        },
        indicator: ({ ownerState }) => {
          ownerState.open satisfies boolean;
          ownerState.highlighted satisfies boolean;
          return {};
        },
        dense: {},
        divider: {},
        gutters: {},
      },
      variants: [
        { props: { open: true, highlighted: true }, style: {} },
        {
          props: ({ open, highlighted, ownerState }) => {
            open satisfies boolean | undefined;
            highlighted satisfies boolean | undefined;
            ownerState.open satisfies boolean | undefined;
            return open === true && highlighted !== true;
          },
          style: {},
        },
      ],
    },
    MuiMenu2Item: {
      defaultProps: { dense: true },
      styleOverrides: {
        root: (props) => {
          const { ownerState, theme } = props;
          ownerState.dense satisfies boolean;
          ownerState.highlighted satisfies boolean;
          // @ts-expect-error Live state belongs to ownerState, not the slot's own props.
          props.highlighted satisfies boolean;
          return {
            padding: theme.spacing(ownerState.dense ? 1 : 2),
            [`&.${menu2ItemClasses.highlighted}`]: { color: theme.menu2TestColor },
          };
        },
        dense: { minHeight: 24 },
        divider: ({ theme }) => ({ borderColor: theme.menu2TestColor }),
        gutters: ({ theme }) => ({ paddingInline: theme.spacing(2) }),
      },
      variants: [
        { props: { divider: true, highlighted: true }, style: {} },
        {
          props: ({ highlighted, ownerState }) => {
            highlighted satisfies boolean | undefined;
            ownerState.highlighted satisfies boolean | undefined;
            return highlighted === true;
          },
          style: {},
        },
      ],
    },
    MuiMenu2CheckboxItem: {
      defaultProps: {
        defaultChecked: true,
        icon: React.createElement('span'),
        checkedIcon: React.createElement('span'),
        onCheckedChange: (checked, eventDetails) => {
          checked satisfies boolean;
          eventDetails.cancel();
        },
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          ownerState.checked satisfies boolean;
          ownerState.highlighted satisfies boolean;
          return { [`&.${menu2CheckboxItemClasses.checked}`]: { color: 'red' } };
        },
        indicator: ({ ownerState }) => {
          ownerState.checked satisfies boolean;
          ownerState.highlighted satisfies boolean;
          return { [`&.${menu2CheckboxItemIndicatorClasses.checked}`]: { color: 'blue' } };
        },
        dense: {},
        divider: {},
        gutters: {},
      },
      variants: [
        { props: { checked: true, highlighted: true }, style: {} },
        {
          props: ({ checked, highlighted, ownerState }) => {
            checked satisfies boolean | undefined;
            highlighted satisfies boolean | undefined;
            ownerState.checked satisfies boolean | undefined;
            return checked === true && highlighted !== true;
          },
          style: {},
        },
      ],
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        value: 'one',
        icon: React.createElement('span'),
        checkedIcon: React.createElement('span'),
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          ownerState.checked satisfies boolean;
          ownerState.highlighted satisfies boolean;
          return {};
        },
        indicator: ({ ownerState }) => {
          ownerState.checked satisfies boolean;
          ownerState.highlighted satisfies boolean;
          return {};
        },
        dense: {},
        divider: {},
        gutters: {},
      },
      variants: [
        { props: { value: 'one', checked: true, highlighted: true }, style: {} },
        {
          props: ({ checked, highlighted, ownerState }) => {
            checked satisfies boolean | undefined;
            highlighted satisfies boolean | undefined;
            ownerState.checked satisfies boolean | undefined;
            return checked === true && highlighted !== true;
          },
          style: {},
        },
      ],
    },
    MuiMenu2LinkItem: {
      defaultProps: { href: '/profile' },
      styleOverrides: {
        root: ({ ownerState }) => {
          ownerState.highlighted satisfies boolean;
          ownerState.disabled satisfies boolean;
          return {};
        },
        dense: {},
        divider: {},
        gutters: {},
      },
      variants: [
        { props: { href: '/profile', highlighted: true }, style: {} },
        {
          props: ({ highlighted, ownerState }) => {
            highlighted satisfies boolean | undefined;
            ownerState.highlighted satisfies boolean | undefined;
            return highlighted === true;
          },
          style: {},
        },
      ],
    },
    MuiMenu2Group: { defaultProps: { id: 'group' }, styleOverrides: { root: {} } },
    MuiMenu2GroupLabel: { defaultProps: { id: 'label' }, styleOverrides: { root: {} } },
    MuiMenu2RadioGroup: {
      defaultProps: { value: 'one' },
      styleOverrides: {
        root: { [`&.${menu2RadioGroupClasses.disabled}`]: { opacity: 0.5 } },
      },
    },
    MuiMenu2Separator: { defaultProps: { className: 'separator' }, styleOverrides: { root: {} } },
  },
});

// @ts-expect-error Use the highlighted class selector in the root override.
const highlightedOverride: ComponentsOverrides['MuiMenu2Item'] = { highlighted: {} };
// @ts-expect-error Use the highlighted class selector in the root override.
const highlightedLinkOverride: ComponentsOverrides['MuiMenu2LinkItem'] = { highlighted: {} };
const highlightedCheckboxOverride: ComponentsOverrides['MuiMenu2CheckboxItem'] = {
  // @ts-expect-error Use the highlighted class selector in the root override.
  highlighted: {},
};
// @ts-expect-error Use the highlighted class selector in the root override.
const highlightedRadioOverride: ComponentsOverrides['MuiMenu2RadioItem'] = { highlighted: {} };
const highlightedSubmenuOverride: ComponentsOverrides['MuiMenu2SubmenuTrigger'] = {
  // @ts-expect-error Use the highlighted class selector in the root override.
  highlighted: {},
};

const customThemeComponents: Components<{ customToken: string }> = {
  MuiMenu2: {
    styleOverrides: { root: ({ theme }) => ({ color: theme.customToken }) },
    variants: [{ props: { open: true }, style: ({ theme }) => ({ color: theme.customToken }) }],
  },
  MuiMenu2RadioItem: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        ownerState.checked satisfies boolean;
        theme.customToken satisfies string;
        return { color: theme.customToken };
      },
      indicator: {
        variants: [
          {
            props: ({ checked, ownerState }) => {
              checked satisfies boolean;
              ownerState.checked satisfies boolean;
              return checked;
            },
            style: ({ theme }) => ({ color: theme.customToken }),
          },
        ],
      },
    },
    variants: [{ props: { checked: true }, style: ({ theme }) => ({ color: theme.customToken }) }],
  },
};

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: {
        // @ts-expect-error Invalid Menu2 prop value.
        align: 'invalid',
      },
      styleOverrides: {
        // @ts-expect-error Unknown Menu2 style slot.
        invalid: {},
      },
      variants: [
        {
          // @ts-expect-error Variant props must retain the Menu2 prop types.
          props: { align: 'invalid' },
          style: {},
        },
      ],
    },
    MuiMenu2Item: {
      defaultProps: {
        // @ts-expect-error Dense is a boolean, not a string.
        dense: 'true',
      },
      variants: [
        {
          // @ts-expect-error Highlighted is a boolean, not a string.
          props: { highlighted: 'true' },
          style: {},
        },
      ],
    },
    MuiMenu2RadioItem: {
      variants: [
        {
          // @ts-expect-error Checked is a boolean, not a string.
          props: { checked: 'true' },
          style: {},
        },
      ],
    },
    MuiMenu2SubmenuTrigger: {
      styleOverrides: {
        // @ts-expect-error Nested variants also require a boolean open state.
        root: {
          variants: [
            {
              props: { open: 'true' },
              style: {},
            },
          ],
        },
      },
      variants: [
        {
          // @ts-expect-error Open is a boolean, not a string.
          props: { open: 'true' },
          style: {},
        },
      ],
    },
  },
});

createTheme({
  components: {
    MuiMenu2Item: {
      defaultProps: {
        // @ts-expect-error Live highlighted state is not a default prop.
        highlighted: true,
      },
    },
    MuiMenu2LinkItem: {
      defaultProps: {
        // @ts-expect-error Live highlighted state is not a default prop.
        highlighted: true,
      },
    },
    MuiMenu2CheckboxItem: {
      defaultProps: {
        checked: true,
        // @ts-expect-error Live highlighted state is not a default prop.
        highlighted: true,
      },
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        // @ts-expect-error Radio checked state comes from the group, not a default prop.
        checked: true,
      },
    },
    MuiMenu2SubmenuTrigger: {
      defaultProps: {
        // @ts-expect-error Live open state is not a default prop.
        open: true,
      },
    },
  },
});
