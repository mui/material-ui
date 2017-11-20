// @flow
// @inheritedComponent ListItem

import React from 'react';
import type { ElementType, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from '../List/ListItem';

export const styles = (theme: Object) => ({
  root: {
    ...theme.typography.subheading,
    height: 24,
    boxSizing: 'content-box',
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

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other base element props.
   */
  [otherProp: string]: any,
  /**
   * Menu item contents.
   */
  children?: Node,
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
  component?: ElementType,
  /**
   * @ignore
   */
  role: string,
  /**
   * Use to apply selected styling.
   */
  selected: boolean,
};

class MenuItem extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    role: 'menuitem',
    selected: false,
  };

  render() {
    const { classes, className: classNameProp, component, selected, role, ...other } = this.props;

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
        tabIndex={-1}
        className={className}
        component={component}
        {...other}
      />
    );
  }
}

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);
