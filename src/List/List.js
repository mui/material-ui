// @flow
import React, {Component, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('List', () => {
  return {
    root: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  };
});

type Props = {
  children?: Element<any>,
  className?: string,
  component: string|Function,
  padding: boolean,
};

export default class List extends Component<void, Props, void> {
  static contextTypes = {
    styleManager: Object,
  };

  props:Props = {
    component: 'div',
    padding: true,
  };

  render():Element<any> {
    const {className, component, padding, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.root, {
      [classes.padding]: padding,
    }, className);
    return React.createElement(component, {className: classNames, ...other});
  }
}
