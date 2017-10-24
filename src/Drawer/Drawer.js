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
import type { TransitionDuration } from '../internal/transition';

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
  docked: {
    flex: '0 0 auto',
  },
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
  paperAnchorLeft: {
    left: 0,
    right: 'auto',
  },
  paperAnchorRight: {
    left: 'auto',
    right: 0,
  },
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 0,
    height: 'auto',
    maxHeight: '100vh',
  },
  paperAnchorBottom: {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100vh',
  },
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.text.divider}`,
  },
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.text.divider}`,
  },
  modal: {}, // Just here so people can override the style.
});

export type Anchor = 'left' | 'top' | 'right' | 'bottom';
export type Type = 'permanent' | 'persistent' | 'temporary';

type ProvidedProps = {
  anchor: Anchor,
  classes: Object,
  elevation: number,
  transitionDuration: TransitionDuration,
  open: boolean,
  type: Type,
};

export type Props = {
  /**
   * Side from which the drawer will appear.
   */
  anchor?: Anchor,
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
   * The elevation of the drawer.
   */
  elevation?: number,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionDuration,
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
   * @igonre
   */
  theme: Object,
  /**
   * Properties applied to the `Slide` element.
   */
  SlideProps?: Object,
  /**
   * The type of drawer.
   */
  type?: Type,
};

type State = {
  firstMount: boolean,
};

class Drawer extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
    anchor: 'left',
    elevation: 16,
    transitionDuration: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
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
      transitionDuration,
      ModalProps,
      onRequestClose,
      open,
      SlideProps,
      theme,
      type,
      ...other
    } = this.props;

    const rtl = theme.direction === 'rtl';
    let anchor = anchorProp;
    if (rtl && ['left', 'right'].includes(anchor)) {
      anchor = anchor === 'left' ? 'right' : 'left';
    }

    const drawer = (
      <Paper
        elevation={type === 'temporary' ? elevation : 0}
        square
        className={classNames(classes.paper, {
          [classes[`paperAnchor${capitalizeFirstLetter(anchor)}`]]: type !== 'permanent',
          [classes[`paperAnchorDocked${capitalizeFirstLetter(anchor)}`]]: type !== 'temporary',
        })}
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
        timeout={transitionDuration}
        appear={!this.state.firstMount}
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
        BackdropTransitionDuration={transitionDuration}
        className={classNames(classes.modal, className)}
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

export default withStyles(styles, { flip: false, withTheme: true, name: 'MuiDrawer' })(Drawer);
