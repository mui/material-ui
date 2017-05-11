// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Typography from '../Typography';

export const styleSheet = createStyleSheet('MuiListItemText', () => {
  return {
    root: {
      flex: '1 1 auto',
      padding: '0 16px',
      '&:first-child': {
        paddingLeft: 0,
      },
    },
    inset: {
      '&:first-child': {
        paddingLeft: 56,
      },
    },
    dense: {
      fontSize: 13,
    },
    text: {
      fontSize: 'inherit',
    },
  };
});

export default function ListItemText(props, context) {
  const {
    className: classNameProp,
    primary,
    secondary,
    inset,
    ...other
  } = props;
  const { dense } = context;
  const classes = context.styleManager.render(styleSheet);
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
   * The CSS class name of the root element.
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
  styleManager: customPropTypes.muiRequired,
};
