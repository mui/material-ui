// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = (theme: Object) => ({
  root: {
    position: 'relative',
    height: 2,
    marginTop: -2,
    transition: theme.transitions.create(),
    willChange: 'left, width',
  },
  colorAccent: {
    backgroundColor: theme.palette.accent.A200,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500],
  },
});

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
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

TabIndicator.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(['accent', 'primary']), PropTypes.string]).isRequired,
  /**
   * @ignore
   * The style of the root element.
   */
  style: PropTypes.shape({
    left: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};

export default withStyles(styles, { name: 'MuiTabIndicator' })(TabIndicator);
