// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Text', (theme) => {
  return {
    text: {
      display: 'block',
      margin: 0,
    },
    display4: theme.typography.display4,
    display3: theme.typography.display3,
    display2: theme.typography.display2,
    display1: theme.typography.display1,
    headline: theme.typography.headline,
    title: theme.typography.title,
    subheading: theme.typography.subheading,
    body2: theme.typography.body2,
    body1: theme.typography.body1,
    caption: theme.typography.caption,
    button: theme.typography.button,
    center: {
      textAlign: 'center',
    },
    noWrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    gutterBottom: {
      marginBottom: '0.25em',
    },
    paragraph: {
      marginBottom: 16,
    },
    colorInherit: {
      color: 'inherit',
    },
    secondary: {
      color: theme.palette.text.secondary,
    },
  };
});

export default function Text(props, context) {
  const {
    align,
    className: classNameProp,
    colorInherit,
    component: componentProp,
    gutterBottom,
    noWrap,
    paragraph,
    secondary,
    type,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const className = classNames(classes.text, classes[type], {
    [classes.colorInherit]: colorInherit,
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
  colorInherit: PropTypes.bool,
  component: PropTypes.string,
  gutterBottom: PropTypes.bool,
  noWrap: PropTypes.bool,
  paragraph: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf([
    'display4',
    'display3',
    'display2',
    'display1',
    'headline',
    'title',
    'subheading',
    'body2',
    'body1',
    'caption',
    'button',
  ]),
};

Text.defaultProps = {
  colorInherit: false,
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
