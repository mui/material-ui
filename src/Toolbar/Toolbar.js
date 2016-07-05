// @flow
import React, {Component, Element} from 'react';
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

type Props = {
  /**
   * Can be a `ToolbarGroup` to render a group of related items.
   */
  children?: Object,
  /**
   * The css class name of the root element.
   */
  className?: string,
  gutters: boolean,
};
export default class Toolbar extends Component<void, Props, void> {
  static contextTypes = {
    styleManager: Object,
  };

  props:Props = {
    gutters: true,
  };

  render():Element {
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
