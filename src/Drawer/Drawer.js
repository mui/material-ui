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
  classes: Object,
  elevation: number,
  enterTransitionDuration: number,
  leaveTransitionDuration: number,
  open: boolean,
};

export type Props = {
  /**
   * Side from which the drawer will appear.
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom',
  /**
   * The contents of the drawer.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Customizes duration of enter animation (ms)
   */
  enterTransitionDuration?: number,
  /**
   * The elevation of the drawer.
   */
  elevation?: number,
  /**
   * Customizes duration of leave animation (ms)
   */
  leaveTransitionDuration?: number,
  /**
   * Properties applied to the `Modal` element.
   */
  ModalProps?: Object,
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
  /**
   * The type of drawer.
   */
  type: 'permanent' | 'persistent' | 'temporary',
};

type AllProps = DefaultProps & Props;

type State = {
  firstMount: boolean,
};

class Drawer extends React.Component<AllProps, State> {
  props: AllProps;

  static defaultProps = {
    anchor: 'left',
    classes: {},
    elevation: 16,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    open: false,
    type: 'temporary', // Mobile first.
  };

  state = {
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
      elevation,
      enterTransitionDuration,
      leaveTransitionDuration,
      ModalProps,
      onRequestClose,
      open,
      SlideProps,
      theme,
      type,
      ...other
    } = this.props;

    const rtl = theme.dir === 'rtl';
    let anchor = anchorProp;
    if (rtl && ['left', 'right'].includes(anchor)) {
      anchor = anchor === 'left' ? 'right' : 'left';
    }

    const drawer = (
      <Paper
        elevation={type === 'temporary' ? elevation : 0}
        square
        className={classNames(classes.paper, classes[`anchor${capitalizeFirstLetter(anchor)}`])}
      >
        {children}
      </Paper>
    );

    if (type === 'permanent') {
      return (
        <div className={classNames(classes.docked, className)} {...other}>
          {drawer}
        </div>
      );
    }

    const slidingDrawer = (
      <Slide
        in={open}
        direction={getSlideDirection(anchor)}
        enterTransitionDuration={enterTransitionDuration}
        leaveTransitionDuration={leaveTransitionDuration}
        transitionAppear={!this.state.firstMount}
        {...SlideProps}
      >
        {drawer}
      </Slide>
    );

    if (type === 'persistent') {
      return (
        <div className={classNames(classes.docked, className)} {...other}>
          {slidingDrawer}
        </div>
      );
    }

    // type === temporary
    return (
      <Modal
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        className={classes.modal}
        show={open}
        onRequestClose={onRequestClose}
        {...other}
        {...ModalProps}
      >
        {slidingDrawer}
      </Modal>
    );
  }
}

export default withStyles(styles, { withTheme: true, name: 'MuiDrawer' })(Drawer);
