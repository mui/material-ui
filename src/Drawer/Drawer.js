// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import Modal from '../internal/Modal';
import withStyles from '../styles/withStyles';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { capitalizeFirstLetter } from '../utils/helpers';
import { duration } from '../styles/transitions';

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }

  // (anchor === 'bottom')
  return 'up';
}

export const styles = (theme: Object) => ({
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 0 auto',
    position: 'fixed',
    top: 0,
    zIndex: theme.zIndex.navDrawer,
    willChange: 'transform',
    '&:focus': {
      outline: 'none',
    },
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
  anchorLeft: {
    left: 0,
    right: 'auto',
  },
  anchorRight: {
    left: 'auto',
    right: 0,
  },
  anchorTop: {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 0,
    height: 'auto',
    maxHeight: '100vh',
  },
  anchorBottom: {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100vh',
  },
  docked: {
    flex: '0 0 auto',
    '& $paper': {
      borderRight: `1px solid ${theme.palette.text.divider}`,
    },
  },
  modal: {},
});

type DefaultProps = {
  anchor: 'left',
  docked: boolean,
  classes: Object,
  enterTransitionDuration: number,
  leaveTransitionDuration: number,
  open: boolean,
  elevation: number,
};

export type Props = {
  /**
   * Side which will the drawer will appear from.
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom',
  /**
   * The contents of the drawer.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the drawer will dock itself
   * and will no longer slide in with an overlay.
   */
  docked?: boolean,
  /**
   * The elevation of the drawer.
   */
  elevation?: number,
  /**
   * Customizes duration of enter animation (ms)
   */
  enterTransitionDuration?: number,
  /**
   * Customizes duration of leave animation (ms)
   */
  leaveTransitionDuration?: number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onRequestClose?: Function,
  /**
   * If `true`, the drawer is open.
   */
  open?: boolean,
  /**
   * Properties applied to the `Slide` element.
   */
  SlideProps?: Object,
  /**
   * @ignore
   */
  theme: Object,
};

type AllProps = DefaultProps & Props;

type State = {
  firstMount: boolean,
};

class Drawer extends React.Component<AllProps, State> {
  props: AllProps;
  static defaultProps = {
    anchor: 'left',
    docked: false,
    classes: {},
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    open: false,
    elevation: 16,
  };

  state: State = {
    // Let's assume that the Drawer will always be rendered on user space.
    // We use that state is order to skip the appear transition during the
    // initial mount of the component.
    firstMount: true,
  };

  componentWillReceiveProps() {
    this.setState({
      firstMount: false,
    });
  }

  render() {
    const {
      anchor: anchorProp,
      children,
      classes,
      className,
      docked,
      enterTransitionDuration,
      leaveTransitionDuration,
      elevation,
      open,
      SlideProps,
      theme,
      ...other
    } = this.props;

    const rtl = theme.dir === 'rtl';
    let anchor = anchorProp;
    if (rtl && ['left', 'right'].includes(anchor)) {
      anchor = anchor === 'left' ? 'right' : 'left';
    }

    const drawer = (
      <Slide
        in={open}
        direction={getSlideDirection(anchor)}
        enterTransitionDuration={enterTransitionDuration}
        leaveTransitionDuration={leaveTransitionDuration}
        transitionAppear={!this.state.firstMount}
        {...SlideProps}
      >
        <Paper
          elevation={docked ? 0 : elevation}
          square
          className={classNames(classes.paper, classes[`anchor${capitalizeFirstLetter(anchor)}`])}
        >
          {children}
        </Paper>
      </Slide>
    );

    if (docked) {
      const { onRequestClose, ...otherDocked } = other;

      return (
        <div className={classNames(classes.docked, className)} {...otherDocked}>
          {drawer}
        </div>
      );
    }

    return (
      <Modal
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        className={classNames(classes.modal, className)}
        {...other}
        show={open}
      >
        {drawer}
      </Modal>
    );
  }
}

export default withStyles(styles, { withTheme: true, name: 'MuiDrawer' })(Drawer);
