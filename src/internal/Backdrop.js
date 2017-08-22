// @flow

import * as React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    backgroundColor: theme.palette.common.lightBlack,
    transition: theme.transitions.create('opacity'),
    willChange: 'opacity',
    opacity: 0,
  },
  invisible: {
    backgroundColor: theme.palette.common.transparent,
  },
});

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: React.Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the backdrop is invisible.
   */
  invisible?: boolean,
};

type AllProps = DefaultProps & Props;

/**
 * @ignore - internal component.
 */
function Backdrop(props: AllProps) {
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

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
