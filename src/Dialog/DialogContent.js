// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiDialogContent', theme => {
  const gutter = theme.spacing.unit * 3;
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

function DialogContent(props) {
  const { classes, children, className, ...other } = props;

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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styleSheet)(DialogContent);
