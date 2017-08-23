// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from '../List/ListItem';

export const styles = (theme: Object) => ({
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
});

type DefaultProps = {
  classes: Object,
  role: string,
  selected: boolean,
};

export type Props = {
  /**
   * Menu item contents.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
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

type AllProps = DefaultProps & Props;

function MenuItem(props: AllProps) {
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

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);
