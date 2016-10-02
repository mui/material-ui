// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Text', (theme) => {
  const { typography } = theme;
  return {
    text: {
      display: 'block',
      margin: 0,
    },
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
    gutterBottom: { marginBottom: '0.25em' },
    paragraph: { marginBottom: 16 },
    secondary: { color: theme.palette.text.secondary },
  };
}, { index: -10 });

class Text extends Component {
  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.string,
    gutterBottom: PropTypes.bool,
    noWrap: PropTypes.bool,
    paragraph: PropTypes.bool,
    secondary: PropTypes.bool,
    type: PropTypes.string,
  };

  static defaultProps = {
    component: 'span',
    type: 'body1',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      align,
      className: classNameProp,
      component: componentProp,
      gutterBottom,
      noWrap,
      paragraph,
      secondary,
      type,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const className = classNames(classes.text, {
      [classes[type]]: true,
      [classes.noWrap]: noWrap,
      [classes.secondary]: secondary,
      [classes.gutterBottom]: gutterBottom,
      [classes.paragraph]: paragraph,
      [classes.center]: align === 'center',
    }, classNameProp);

    const component = paragraph ? 'p' : componentProp;

    return React.createElement(component, { className, ...other });
  }
}

export default Text;
