import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Slide from '../transitions/Slide';

export const styleSheet = createStyleSheet('Dialog', () => {
  return {
    dialog: {
      position: 'relative',
      width: '75%',
      maxWidth: 960,
      margin: '0 auto',
      '&:focus': {
        outline: 'none',
      },
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
    },
  };
});

export default class Dialog extends Component {

  static propTypes = {
    children: PropTypes.any,
    onBackdropClick: PropTypes.func,
    /**
     * Callback fired before the modal is entering
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the modal is entering
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the modal has entered
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the modal is exiting
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the modal is exiting
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the modal has exited
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when the modal requests to be closed
     */
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      open,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Modal
        show={open}
        {...other}
      >
        <Slide
          in={open}
          direction="down"
          transitionAppear={true}
        >
          <div className={classes.container}>
            <Paper zDepth={24} className={classes.dialog}>
              {children}
            </Paper>
          </div>
        </Slide>
      </Modal>
    );
  }
}
