// @flow

import React from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import { lightBlack } from '../styles/colors';

export const styleSheet = createStyleSheet('MuiBackdrop', (theme) => {
  return {
    root: {
      zIndex: -1,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: lightBlack,
      transition: theme.transitions.create('opacity'),
      willChange: 'opacity',
      opacity: 0,
    },
    invisible: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  };
});

type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Element<*>,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the backdrop is invisible.
   */
  invisible?: boolean,
};

function Backdrop(props: Props, context: { styleManager: Object }) {
  const {
    children,
    className,
    invisible,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const backdropClass = classNames(classes.root, {
    [classes.invisible]: invisible,
  }, className);
  return (
    <div
      data-mui-test="Backdrop"
      className={backdropClass}
      aria-hidden="true"
      {...other}
    >
      {children}
    </div>
  );
}

Backdrop.defaultProps = {
  invisible: false,
};

Backdrop.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default Backdrop;
