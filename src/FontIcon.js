// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';


import IconButton from 'material-ui/IconButton';
const styleSheet = createStyleSheet('FontIcons', (theme) => ({
  sortLabel: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    background: 'transparent',
  },
  active: {
    color: theme.contrast,
  },
  button: {
    padding:10,
    '&:hover': {
      color: theme.contrast,
    },
    '&:focus': {
      color: theme.contrast,
    },
  },
  contrast: {
    color: theme.contrast,
  }
}));
styleSheet.registerLocalTheme((theme) => {
  const { palette, transitions } = theme;
  return {
    color: palette.type === 'light' ?
      palette.text.secondary : palette.text.primary,
    contrast: palette.type === 'light' ?
      palette.shades.dark.text.primary : palette.shades.light.text.secondary,
    primary: palette.primary,
    accent: palette.accent,
    transition: transitions.create('background-color', '150ms'),
    focusBackground: palette.text.divider,
  };
});

export default function FontIcon(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const { active, className, ...other } = props;
  const sortLabelClasses = classNames(classes.button, {
    [classes.active]: active,
  }, className);
  return (
    <IconButton className={sortLabelClasses} {...other} ripple/>
  );
}
FontIcon.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

