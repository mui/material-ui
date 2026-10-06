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
        root: { [`&.${menu2SubmenuTriggerClasses.open}`]: { color: 'red' } },
        indicator: {},
        dense: {},
        divider: {},
        gutters: {},
      },
    },
    MuiMenu2Item: {
      defaultProps: { dense: true },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          ownerState.dense satisfies boolean | undefined;
          return {
            padding: theme.spacing(ownerState.dense ? 1 : 2),
            [`&.${menu2ItemClasses.highlighted}`]: { color: theme.menu2TestColor },
          };
        },
        dense: { minHeight: 24 },
        divider: ({ theme }) => ({ borderColor: theme.menu2TestColor }),
        gutters: ({ theme }) => ({ paddingInline: theme.spacing(2) }),
      },
      variants: [{ props: { divider: true }, style: {} }],
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
        root: { [`&.${menu2CheckboxItemClasses.checked}`]: { color: 'red' } },
        indicator: { [`&.${menu2CheckboxItemIndicatorClasses.checked}`]: { color: 'blue' } },
        dense: {},
        divider: {},
        gutters: {},
      },
      variants: [{ props: { checked: true }, style: {} }],
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        value: 'one',
        icon: React.createElement('span'),
        checkedIcon: React.createElement('span'),
      },
      styleOverrides: { root: {}, indicator: {}, dense: {}, divider: {}, gutters: {} },
      variants: [{ props: { value: 'one' }, style: {} }],
    },
    MuiMenu2LinkItem: {
      defaultProps: { href: '/profile' },
      styleOverrides: { root: {}, dense: {}, divider: {}, gutters: {} },
      variants: [{ props: { href: '/profile' }, style: {} }],
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
    },
  },
});
