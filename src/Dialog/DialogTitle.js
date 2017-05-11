// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Typography from '../Typography';

export const styleSheet = createStyleSheet('MuiDialogTitle', () => {
  const gutter = 24;
  return {
    root: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      flex: '0 0 auto',
    },
  };
});

export default function DialogTitle(props, context) {
  const {
    children,
    className,
    disableTypography,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);

  return (
    <div
      data-mui-test="DialogTitle"
      className={classNames(classes.root, className)}
      {...other}
    >
      {disableTypography ? (
        children
      ) : (
        <Typography type="title">
          {children}
        </Typography>
      )}
    </div>
  );
}

DialogTitle.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be usefull to can render an h4 instead of a
   */
  disableTypography: PropTypes.bool,
};

DialogTitle.defaultProps = {
  disableTypography: false,
};

DialogTitle.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
