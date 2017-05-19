// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styleSheet = createStyleSheet('MuiListItemText', (theme) => ({
  root: {
    flex: '1 1 auto',
    padding: '0 16px',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  inset: {
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 7,
    },
  },
  dense: {
    fontSize: 13,
  },
  text: {
    fontSize: 'inherit',
  },
}));

function ListItemText(props, context) {
  const {
    classes,
    className: classNameProp,
    primary,
    secondary,
    inset,
    ...other
  } = props;
  const { dense } = context;
  const className = classNames(classes.root, {
    [classes.dense]: dense,
    [classes.inset]: inset,
  }, classNameProp);

  return (
    <div className={className} {...other}>
      {primary && (
        typeof primary === 'string' ? (
          <Typography type="subheading" className={classNames({ [classes.text]: dense })}>
            {primary}
          </Typography>
        ) : primary
      )}
      {secondary && (
        typeof secondary === 'string' ? (
          <Typography secondary type="body1" className={classNames({ [classes.text]: dense })}>
            {secondary}
          </Typography>
        ) : secondary
      )}
    </div>
  );
}

ListItemText.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  primary: false,
  secondary: false,
  inset: false,
};

ListItemText.contextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styleSheet)(ListItemText);
