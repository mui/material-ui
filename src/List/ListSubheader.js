// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = (theme: Object) => ({
  root: {
    boxSizing: 'border-box',
    lineHeight: '48px',
    paddingLeft: 16,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
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
});

function ListSubheader(props) {
  const { classes, className: classNameProp, color, inset, children, ...other } = props;
  const className = classNames(
    classes.root,
    {
      [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
      [classes.inset]: inset,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

ListSubheader.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'primary', 'inherit']),
  /**
   * If `true`, the List Subheader will be indented.
   */
  inset: PropTypes.bool,
};

ListSubheader.defaultProps = {
  color: 'default',
  inset: false,
};

ListSubheader.muiName = 'ListSubheader';

export default withStyles(styles, { name: 'MuiListSubheader' })(ListSubheader);
