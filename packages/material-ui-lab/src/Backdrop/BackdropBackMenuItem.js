// @inheritedComponent MenuItem

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { capitalize } from '@material-ui/core/utils/helpers';

const styles = theme => {
  const transition = theme.transitions.create('backgroundColor', {
    duration: theme.transitions.duration.shortest,
  });

  return {
    root: {
      ...theme.typography.body2,
      padding: 7.5,
      borderRadius: 3,
      backgroundColor: 'transparent',
      transition,
    },
    colorPrimary: {
      color: theme.palette.primary.contrastText,
      '&$selected': {
        backgroundColor: theme.palette.primary[300],
      },
    },
    colorSecondary: {
      color: theme.palette.secondary.contrastText,
      '&$selected': {
        backgroundColor: theme.palette.secondary[300],
      },
    },
    selected: {},
  };
};

function BackdropMenuItem(props) {
  const { classes, className: classNameProp, color, selected, ...other } = props;
  const className = classNames(
    classes.root,
    classes[`color${capitalize(color)}`],
    { [classes.selected]: selected },
    classNameProp,
  );
  return <MenuItem className={className} selected={selected} {...other} />;
}

BackdropMenuItem.propTypes = {
  ...MenuItem.propTypes,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Use to apply selected styling.
   */
  selected: PropTypes.bool,
};

BackdropMenuItem.defaultProps = {
  color: 'primary',
  selected: false,
};

export default withStyles(styles, { name: 'MuiBackdropMenuItem' })(BackdropMenuItem);
