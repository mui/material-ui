// @flow
import React, {Component, Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('Text', (theme) => {
  const {typography} = theme;
  return {
    text: {display: 'block'},
    display4: typography.display4,
    display3: typography.display3,
    display2: typography.display2,
    display1: typography.display1,
    headline: typography.headline,
    title: typography.title,
    subheading: typography.subheading,
    body2: typography.body2,
    body1: typography.body1,
    caption: typography.caption,
    button: typography.button,
    center: {
      textAlign: 'center',
    },
    noWrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };
});

type DefaultProps = {
  el: string,
  type: string,
};

type Props = {
  align?: string,
  children?: Object,
  className?: string,
  el: string,
  noWrap?: boolean,
  type?: string,
};

export default class Text extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    el: 'span',
    type: 'body1',
  };

  props:Props;

  render():Element {
    const {align, className, el, noWrap, type, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.text, {
      [classes[type]]: true,
      [classes.noWrap]: noWrap,
      [classes.center]: align === 'center',
    }, className);
    return React.createElement(el, {className: classNames, ...other});
  }
}
