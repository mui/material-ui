// @flow

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { lightBlack } from '../styles/colors';

export const styleSheet = createStyleSheet('MuiBackdrop', theme => ({
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
}));

type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the backdrop is invisible.
   */
  invisible?: boolean,
};

function Backdrop(props: Props) {
  const { children, classes, className, invisible, ...other } = props;

  const backdropClass = classNames(
    classes.root,
    {
      [classes.invisible]: invisible,
    },
    className,
  );

  return (
    <div data-mui-test="Backdrop" className={backdropClass} aria-hidden="true" {...other}>
      {children}
    </div>
  );
}

Backdrop.defaultProps = {
  invisible: false,
};

export default withStyles(styleSheet)(Backdrop);
