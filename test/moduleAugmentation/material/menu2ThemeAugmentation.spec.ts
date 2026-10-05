import type {} from '@mui/material/Unstable_Menu2/themeAugmentation';
import { createTheme, Components } from '@mui/material/styles';

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
      styleOverrides: { root: {}, indicator: {} },
    },
    MuiMenu2Item: {
      defaultProps: { dense: true },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          ownerState.dense satisfies boolean | undefined;
          return { padding: theme.spacing(ownerState.dense ? 1 : 2) };
        },
      },
      variants: [{ props: { divider: true }, style: {} }],
    },
    MuiMenu2CheckboxItem: {
      defaultProps: {
        defaultChecked: true,
        onCheckedChange: (checked, eventDetails) => {
          checked satisfies boolean;
          eventDetails.cancel();
        },
      },
      styleOverrides: { root: {}, indicator: {} },
      variants: [{ props: { checked: true }, style: {} }],
    },
    MuiMenu2RadioItem: {
      defaultProps: { value: 'one' },
      styleOverrides: { root: {}, indicator: {} },
      variants: [{ props: { value: 'one' }, style: {} }],
    },
    MuiMenu2LinkItem: {
      defaultProps: { href: '/profile' },
      styleOverrides: { root: {} },
      variants: [{ props: { href: '/profile' }, style: {} }],
    },
    MuiMenu2Group: { defaultProps: { id: 'group' }, styleOverrides: { root: {} } },
    MuiMenu2GroupLabel: { defaultProps: { id: 'label' }, styleOverrides: { root: {} } },
    MuiMenu2RadioGroup: { defaultProps: { value: 'one' }, styleOverrides: { root: {} } },
    MuiMenu2Separator: { defaultProps: { className: 'separator' }, styleOverrides: { root: {} } },
  },
});

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
