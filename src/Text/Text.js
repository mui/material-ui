// @flow weak

import React, { PropTypes } from 'react';
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
});

export default function Text(props, context) {
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
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const className = classNames(classes.text, {
    [classes[type]]: true,
    [classes.noWrap]: noWrap,
    [classes.secondary]: secondary,
    [classes.gutterBottom]: gutterBottom,
    [classes.paragraph]: paragraph,
    [classes.center]: align === 'center',
  }, classNameProp);

  const Component = paragraph ? 'p' : componentProp;

  return <Component className={className} {...other} />;
}

Text.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  component: PropTypes.string,
  gutterBottom: PropTypes.bool,
  noWrap: PropTypes.bool,
  paragraph: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.string,
};

Text.defaultProps = {
  component: 'span',
  gutterBottom: false,
  noWrap: false,
  paragraph: false,
  secondary: false,
  type: 'body1',
};

Text.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
