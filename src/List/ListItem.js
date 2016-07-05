// @flow
import React, {Component, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('ListItem', (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 8,
      paddingBottom: 8,
      textDecoration: 'none',
    },
    gutters: theme.mixins.gutters({}),
  };
});

type Props = {
  children?: Object,
  className?: string,
  component: string|Object,
  gutters: boolean,
};

export default class ListItem extends Component<void, Props, void> {
  static contextTypes = {
    styleManager: Object,
  };

  props:Props = {
    component: 'div',
    gutters: true,
  };

  render():Element {
    const {className, component, gutters, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.root, {
      [classes.gutters]: gutters,
    }, className);
    return React.createElement(component, {className: classNames, ...other});
  }
}
