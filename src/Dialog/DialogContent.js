// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiDialogContent', () => {
  const gutter = 24;
  return {
    root: {
      flex: '1 1 auto',
      overflowY: 'auto',
      padding: `0 ${gutter}px ${gutter}px ${gutter}px`,
      '&:first-child': {
        paddingTop: gutter,
      },
    },
  };
});

export default function DialogContent(props, context) {
  const {
    children,
    className,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

DialogContent.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

DialogContent.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
