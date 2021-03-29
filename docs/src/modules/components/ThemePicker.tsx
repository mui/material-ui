import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { folder, useControls } from 'leva';

interface ThemePickerProps {
  children: React.ReactNode;
  theme: Theme;
}

export default function ThemePicker(props: ThemePickerProps) {
  const { children, theme } = props;

  const {
    primaryMain,
    secondaryMain,
    errorContrastText,
    errorDark,
    errorLight,
    errorMain,
    warningContrastText,
    warningDark,
    warningLight,
    warningMain,
    infoContrastText,
    infoDark,
    infoLight,
    infoMain,
    successContrastText,
    successDark,
    successLight,
    successMain,
    mode,
    tonalOffset,
    contrastThreshold,
    commonBlack,
    commonWhite,
    textDisabled,
    textPrimary,
    textSecondary,
    divider,
    actionActivatedOpacity,
    actionActive,
    actionDisabled,
    actionDisabledBackground,
    actionDisabledOpacity,
    actionFocus,
    actionFocusOpacity,
    actionHover,
    actionHoverOpacity,
    actionSelected,
    actionSelectedOpacity,
    backgroundDefault,
    backgroundPaper,
  } = useControls('palette', {
    primaryMain: {
      value: theme.palette.primary.main,
      label: 'primary',
    },
    secondaryMain: {
      value: theme.palette.secondary.main,
      label: 'seconary',
    },
    error: folder({
      errorContrastText: {
        value: theme.palette.error.contrastText,
        label: 'contrastText',
      },
      errorDark: {
        value: theme.palette.error.dark,
        label: 'dark',
      },
      errorLight: {
        value: theme.palette.error.light,
        label: 'light',
      },
      errorMain: {
        value: theme.palette.error.main,
        label: 'main',
      },
    }),
    warning: folder({
      warningContrastText: {
        value: theme.palette.warning.contrastText,
        label: 'contrastText',
      },
      warningDark: {
        value: theme.palette.warning.dark,
        label: 'dark',
      },
      warningLight: {
        value: theme.palette.warning.light,
        label: 'light',
      },
      warningMain: {
        value: theme.palette.warning.main,
        label: 'main',
      },
    }),
    info: folder({
      infoContrastText: {
        value: theme.palette.info.contrastText,
        label: 'contrastText',
      },
      infoDark: {
        value: theme.palette.info.dark,
        label: 'dark',
      },
      infoLight: {
        value: theme.palette.info.light,
        label: 'light',
      },
      infoMain: {
        value: theme.palette.info.main,
        label: 'main',
      },
    }),
    success: folder({
      successContrastText: {
        value: theme.palette.success.contrastText,
        label: 'contrastText',
      },
      successDark: {
        value: theme.palette.success.dark,
        label: 'dark',
      },
      successLight: {
        value: theme.palette.success.light,
        label: 'light',
      },
      successMain: {
        value: theme.palette.success.main,
        label: 'main',
      },
    }),
    mode: {
      value: theme.palette.mode,
      options: ['dark', 'light'],
    },
    tonalOffset: {
      // TODO: validate at runtime
      value: theme.palette.tonalOffset as number,
      // TODO: good range for `tonalOffset`
      min: 0,
      max: 10,
    },
    contrastThreshold: {
      value: theme.palette.contrastThreshold,
      // TODO: good range for `contrastThreshold`
      min: 0,
      max: 10,
    },
    common: folder({
      commonBlack: {
        value: theme.palette.common.black,
        label: 'black',
      },
      commonWhite: {
        value: theme.palette.common.white,
        label: 'white',
      },
    }),
    text: folder({
      textDisabled: {
        value: theme.palette.text.disabled,
        label: 'disabled',
      },
      textPrimary: {
        value: theme.palette.text.primary,
        label: 'primary',
      },
      textSecondary: {
        value: theme.palette.text.secondary,
        label: 'secondary',
      },
    }),
    divider: theme.palette.divider,
    action: folder({
      actionActivatedOpacity: {
        value: theme.palette.action.activatedOpacity,
        label: 'activatedOpacity',
        min: 0,
        max: 1,
      },
      actionActive: {
        value: theme.palette.action.active,
        label: 'active',
      },
      actionDisabled: {
        value: theme.palette.action.disabled,
        label: 'disabled',
      },
      actionDisabledBackground: {
        value: theme.palette.action.disabledBackground,
        label: 'disabledBackground',
      },
      actionDisabledOpacity: {
        value: theme.palette.action.disabledOpacity,
        label: 'disabledOpacity',
        min: 0,
        max: 1,
      },
      actionFocus: {
        value: theme.palette.action.focus,
        label: 'focus',
      },
      actionFocusOpacity: {
        value: theme.palette.action.focusOpacity,
        label: 'focusOpacity',
        min: 0,
        max: 1,
      },
      actionHover: {
        value: theme.palette.action.hover,
        label: 'hover',
      },
      actionHoverOpacity: {
        value: theme.palette.action.hoverOpacity,
        label: 'hoverOpacity',
        min: 0,
        max: 1,
      },
      actionSelected: {
        value: theme.palette.action.selected,
        label: 'selected',
      },
      actionSelectedOpacity: {
        value: theme.palette.action.selectedOpacity,
        label: 'selectedOpacity',
        min: 0,
        max: 1,
      },
    }),
    background: folder({
      backgroundDefault: {
        value: theme.palette.background.default,
        label: 'default',
      },
      backgroundPaper: {
        value: theme.palette.background.paper,
        label: 'paper',
      },
    }),
  });

  const customizedTheme = createMuiTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        main: primaryMain,
      },
      secondary: {
        main: secondaryMain,
      },
      error: {
        contrastText: errorContrastText,
        dark: errorDark,
        light: errorLight,
        main: errorMain,
      },
      warning: {
        contrastText: warningContrastText,
        dark: warningDark,
        light: warningLight,
        main: warningMain,
      },
      info: {
        contrastText: infoContrastText,
        dark: infoDark,
        light: infoLight,
        main: infoMain,
      },
      success: {
        contrastText: successContrastText,
        dark: successDark,
        light: successLight,
        main: successMain,
      },
      mode: mode as NonNullable<Theme['palette']['mode']>,
      tonalOffset,
      contrastThreshold,
      common: {
        black: commonBlack,
        white: commonWhite,
      },
      // TODO: `grey` accepts a ColorPartial. Does this even make sense?
      text: {
        disabled: textDisabled,
        primary: textPrimary,
        secondary: textSecondary,
      },
      divider,
      action: {
        activatedOpacity: actionActivatedOpacity,
        active: actionActive,
        disabled: actionDisabled,
        disabledBackground: actionDisabledBackground,
        disabledOpacity: actionDisabledOpacity,
        focus: actionFocus,
        focusOpacity: actionFocusOpacity,
        hover: actionHover,
        hoverOpacity: actionHoverOpacity,
        selected: actionSelected,
        selectedOpacity: actionSelectedOpacity,
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
    },
  });

  return <MuiThemeProvider theme={customizedTheme}>{children}</MuiThemeProvider>;
}

ThemePicker.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};
