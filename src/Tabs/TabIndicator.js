// @flow weak

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = (theme: Object) => ({
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create(),
    willChange: 'left, width',
  },
  colorAccent: {
    backgroundColor: theme.palette.secondary.A200,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500],
  },
});

export type IndicatorStyle = {
  left: number,
  width: number,
};

export type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: 'accent' | 'primary' | string,
  /**
   * @ignore
   * The style of the root element.
   */
  style: IndicatorStyle,
};

/**
 * @ignore - internal component.
 */
function TabIndicator(props: ProvidedProps & Props) {
  const { classes, className: classNameProp, color, style: styleProp } = props;
  const colorPredefined = ['primary', 'accent'].indexOf(color) !== -1;
  const className = classNames(
    classes.root,
    {
      [classes[`color${capitalizeFirstLetter(color)}`]]: colorPredefined,
    },
    classNameProp,
  );

  const style = colorPredefined
    ? styleProp
    : {
        ...styleProp,
        backgroundColor: color,
      };

  return <div className={className} style={style} />;
}

export default withStyles(styles, { name: 'MuiTabIndicator' })(TabIndicator);
