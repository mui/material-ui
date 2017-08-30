// @flow

import React from 'react';
import type { ComponentType, Node } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { isMuiComponent } from '../utils/reactHelpers';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
  },
  container: {
    position: 'relative',
  },
  keyboardFocused: {
    background: theme.palette.text.divider,
  },
  default: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  dense: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  disabled: {
    opacity: 0.5,
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
  gutters: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  button: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.text.divider,
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
});

type DefaultProps = {
  classes: Object,
  component: string,
};

export type Props = {
  /**
   * If `true`, the ListItem will be a button.
   */
  button?: boolean,
  /**
   * The content of the component.
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
  component?: string | ComponentType<*>,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense?: boolean,
  /**
   * @ignore
   */
  disabled?: boolean,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters?: boolean,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider?: boolean,
};

type AllProps = DefaultProps & Props;

class ListItem extends React.Component<AllProps, void> {
  props: AllProps;
  static defaultProps = {
    button: false,
    classes: {},
    component: 'li',
    dense: false,
    disabled: false,
    disableGutters: false,
    divider: false,
  };

  getChildContext() {
    return {
      dense: this.props.dense || this.context.dense || false,
    };
  }

  render() {
    const {
      button,
      children: childrenProp,
      classes,
      className: classNameProp,
      component: componentProp,
      dense,
      disabled,
      divider,
      disableGutters,
      ...other
    } = this.props;
    const isDense = dense || this.context.dense || false;
    const children = React.Children.toArray(childrenProp);

    const hasAvatar = children.some(value => isMuiComponent(value, 'ListItemAvatar'));

    const className = classNames(
      classes.root,
      {
        [classes.gutters]: !disableGutters,
        [classes.divider]: divider,
        [classes.disabled]: disabled,
        [classes.button]: button,
        [isDense || hasAvatar ? classes.dense : classes.default]: true,
      },
      classNameProp,
    );

    const listItemProps = { className, disabled, ...other };
    let ComponentMain = componentProp;

    if (button) {
      ComponentMain = ButtonBase;
      listItemProps.component = componentProp || 'li';
      listItemProps.keyboardFocusedClassName = classes.keyboardFocused;
    }

    if (
      children.length &&
      isMuiComponent(children[children.length - 1], 'ListItemSecondaryAction')
    ) {
      const secondaryAction = children.pop();
      return (
        <div className={classes.container}>
          <ComponentMain {...listItemProps}>{children}</ComponentMain>
          {secondaryAction}
        </div>
      );
    }

    return <ComponentMain {...listItemProps}>{children}</ComponentMain>;
  }
}

ListItem.contextTypes = {
  dense: PropTypes.bool,
};

ListItem.childContextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListItem' })(ListItem);
