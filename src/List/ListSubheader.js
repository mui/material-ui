// @flow weak

import React from 'react';
import type { Node, ElementType } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = (theme: Object) => ({
  root: {
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
  },
  colorPrimary: {
    color: theme.palette.primary[500],
  },
  colorInherit: {
    color: 'inherit',
  },
  inset: {
    paddingLeft: theme.spacing.unit * 9,
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'inherit',
  },
});

type Color = 'default' | 'primary' | 'inherit';

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: ElementType,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color?: Color,
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   */
  disableSticky?: boolean,
  /**
   * If `true`, the List Subheader will be indented.
   */
  inset?: boolean,
};

class ListSubheader extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    component: 'li',
    color: 'default',
    disableSticky: false,
    inset: false,
  };

  static muiName = 'ListSubheader';

  render() {
    const {
      children,
      classes,
      className: classNameProp,
      component: ComponentProp,
      color,
      disableSticky,
      inset,
      ...other
    } = this.props;
    const className = classNames(
      classes.root,
      {
        [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
        [classes.inset]: inset,
        [classes.sticky]: !disableSticky,
      },
      classNameProp,
    );

    return (
      <ComponentProp className={className} {...other}>
        {children}
      </ComponentProp>
    );
  }
}

export default withStyles(styles, { name: 'MuiListSubheader' })(ListSubheader);
