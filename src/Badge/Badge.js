// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

const RADIUS = 12;

export const styles = (theme: Object) => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -RADIUS,
    right: -RADIUS,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight,
    fontSize: theme.typography.pxToRem(RADIUS),
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: '50%',
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
    zIndex: 1, // Render the badge on top of potential ripples.
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorAccent: {
    backgroundColor: theme.palette.secondary.A200,
    color: theme.palette.getContrastText(theme.palette.secondary.A200),
  },
});

type Color = 'default' | 'primary' | 'accent';

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other div props.
   */
  [otherProp: string]: any,
  /**
   * The content rendered within the badge.
   */
  badgeContent: Node,
  /**
   * The badge will be added relative to this node.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: Color,
};

class Badge extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    color: 'default',
  };

  render() {
    const {
      badgeContent,
      classes,
      className: classNameProp,
      color,
      children,
      ...other
    } = this.props;
    const className = classNames(classes.root, classNameProp);
    const badgeClassName = classNames(classes.badge, {
      [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
    });

    return (
      <div className={className} {...other}>
        {children}
        <span className={badgeClassName}>{badgeContent}</span>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiBadge' })(Badge);
