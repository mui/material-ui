// @flow

import React, { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiTypography', (theme) => ({
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
  'align-left': {
    textAlign: 'left',
  },
  'align-center': {
    textAlign: 'center',
  },
  'align-right': {
    textAlign: 'right',
  },
  'align-justify': {
    textAlign: 'justify',
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  gutterBottom: {
    marginBottom: '0.35em',
  },
  paragraph: {
    marginBottom: theme.spacing.unit * 2,
  },
  colorInherit: {
    color: 'inherit',
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
}));

type Type = 'display4' |
  'display3' |
  'display2' |
  'display1' |
  'headline' |
  'title' |
  'subheading' |
  'body2' |
  'body1' |
  'caption' |
  'button';

type Props = {
  align?: 'left' | 'center' | 'right' | 'justify',
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the text will inherit its color.
   */
  colorInherit?: boolean,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default we map the type to a good default headline component.
   */
  component?: string | Function,
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom?: boolean,
  /**
   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
   */
  noWrap?: boolean,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph?: boolean,
  /**
   * If `true`, the secondary color will be applied.
   */
  secondary?: boolean,
  /**
   * Applies the theme typography styles.
   */
  type?: Type
};

const headlineMapping: { [key: Type]: string } = {
  display4: 'h1',
  display3: 'h1',
  display2: 'h1',
  display1: 'h1',
  headline: 'h1',
  title: 'h2',
  subheading: 'h3',
  body2: 'aside',
  body1: 'p',
};

function Typography(props: Props) {
  const {
    align,
    classes,
    className: classNameProp,
    colorInherit,
    component: componentProp,
    gutterBottom,
    noWrap,
    paragraph,
    secondary,
    type: typeProp,
    ...other
  } = props;

  // workaround: see https://github.com/facebook/flow/issues/1660#issuecomment-297775427
  const type = typeProp || Typography.defaultProps.type;

  const className = classNames(classes.text, classes[type], {
    [classes.colorInherit]: colorInherit,
    [classes.noWrap]: noWrap,
    [classes.secondary]: secondary,
    [classes.gutterBottom]: gutterBottom,
    [classes.paragraph]: paragraph,
    [classes[`align-${String(align)}`]]: align,
  }, classNameProp);

  const Component = componentProp || (paragraph ? 'p' : headlineMapping[type]) || 'span';

  return <Component className={className} {...other} />;
}

Typography.defaultProps = {
  colorInherit: false,
  gutterBottom: false,
  noWrap: false,
  paragraph: false,
  secondary: false,
  type: 'body1',
};

export default withStyles(styleSheet)(Typography);
