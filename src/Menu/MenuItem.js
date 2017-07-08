// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import ListItem from '../List/ListItem';

export const styleSheet = createStyleSheet('MuiMenuItem', theme => ({
  root: {
    ...theme.typography.subheading,
    height: 48,
    boxSizing: 'border-box',
    background: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:focus': {
      background: theme.palette.text.divider,
    },
    '&:hover': {
      backgroundColor: theme.palette.text.divider,
    },
  },
  selected: {
    backgroundColor: theme.palette.text.divider,
  },
}));

type DefaultProps = {
  role: string,
  selected: boolean,
};

type Props = DefaultProps & {
  /**
   * Menu item contents.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | Function,
  /**
   * @ignore
   */
  role?: string,
  /**
   * Use to apply selected styling.
   */
  selected?: boolean,
};

function MenuItem(props: Props) {
  const { classes, className: classNameProp, component, selected, role, ...other } = props;

  const className = classNames(
    classes.root,
    {
      [classes.selected]: selected,
    },
    classNameProp,
  );

  return (
    <ListItem
      button
      role={role}
      tabIndex="-1"
      className={className}
      component={component}
      {...other}
    />
  );
}

MenuItem.defaultProps = {
  role: 'menuitem',
  selected: false,
};

export default withStyles(styleSheet)(MenuItem);
