// @flow
import React, {Component, Element, PropTypes} from 'react';
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

type DefaultProps = {
  component: string,
  padding: boolean,
};

type Props = {
  children?: Element<any>,
  className?: string,
  component: string|Function,
  padding?: boolean,
};

export default class List extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    component: 'div',
    padding: true,
  };

  props:Props;

  render(): Element<any> {
    const {className, component, padding, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.root, {
      [classes.padding]: padding,
    }, className);
    return React.createElement(component, {className: classNames, ...other});
  }
}
