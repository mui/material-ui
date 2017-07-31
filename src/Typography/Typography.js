// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styleSheet = createStyleSheet('MuiTypography', theme => ({
  root: {
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
  alignLeft: {
    textAlign: 'left',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  alignJustify: {
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
  colorSecondary: {
    color: theme.palette.text.secondary,
  },
  colorAccent: {
    color: theme.palette.accent.A400,
  },
}));

type Type =
  | 'display4'
  | 'display3'
  | 'display2'
  | 'display1'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body2'
  | 'body1'
  | 'caption'
  | 'button';

export type Props = {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify',
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default we map the type to a good default headline component.
   */
  component?: string | Function,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color?: 'inherit' | 'secondary' | 'accent' | 'default',
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom?: boolean,
  /**
   * We are empirically mapping the type property to a range of different DOM element type.
   * For instance, h1 to h6. If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` property.
   */
  headlineMapping: { [key: Type]: string },
  /**
   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
   */
  noWrap?: boolean,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph?: boolean,
  /**
   * Applies the theme typography styles.
   */
  type?: Type,
};

function Typography(props: Props) {
  const {
    align,
    classes,
    className: classNameProp,
    component: componentProp,
    color,
    gutterBottom,
    headlineMapping,
    noWrap,
    paragraph,
    type: typeProp,
    ...other
  } = props;

  // workaround: see https://github.com/facebook/flow/issues/1660#issuecomment-297775427
  const type = typeProp || Typography.defaultProps.type;

  const className = classNames(
    classes.root,
    classes[type],
    {
      [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
      [classes.noWrap]: noWrap,
      [classes.gutterBottom]: gutterBottom,
      [classes.paragraph]: paragraph,
      [classes[`align${capitalizeFirstLetter(align)}`]]: align !== 'inherit',
    },
    classNameProp,
  );

  const Component = componentProp || (paragraph ? 'p' : headlineMapping[type]) || 'span';

  return <Component className={className} {...other} />;
}

Typography.defaultProps = {
  align: 'inherit',
  color: 'default',
  gutterBottom: false,
  headlineMapping: {
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    body2: 'aside',
    body1: 'p',
  },
  noWrap: false,
  paragraph: false,
  type: 'body1',
};

export default withStyles(styleSheet)(Typography);
