// @flow
import React, {Component, Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Toolbar', (theme) => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 56,
    },
    gutters: theme.mixins.gutters({}),
    [theme.breakpoints.up('sm')]: {
      root: {
        height: 64,
      },
    },
  };
});

type DefaultProps = {
  gutters: boolean,
};

type Props = {
  /**
   * Can be a `ToolbarGroup` to render a group of related items.
   */
  children?: Element<any>,
  /**
   * The css class name of the root element.
   */
  className?: string,
  gutters?: boolean,
};
export default class Toolbar extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    gutters: true,
  };

  props:Props;

  render(): Element<any> {
    const {
      children,
      className,
      gutters,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    return (
      <div className={ClassNames(classes.root, {[classes.gutters]: gutters}, className)} {...other} >
        {children}
      </div>
    );
  }
}
