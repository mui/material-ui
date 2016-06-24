import React, {Component, PropTypes} from 'react';
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

export default class Text extends Component {
  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    el: PropTypes.string,
    noWrap: PropTypes.bool,
    type: PropTypes.string,
  };

  static defaultProps = {
    el: 'span',
    type: 'body1',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {align, className, el, noWrap, type, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const classNames = ClassNames(classes.text, {
      [classes[type]]: true,
      [classes.noWrap]: noWrap,
      [classes.center]: align === 'center',
    }, className);
    return React.createElement(el, {className: classNames, ...other});
  }
}
