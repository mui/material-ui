import React, {Component, PropTypes} from 'react';
import ReactOverlaysModal from 'react-overlays/lib/Modal';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Fade from '../Animation/Fade';
import {lightBlack} from '../styles/colors';

export const styleSheet = createStyleSheet('Modal', (theme) => {
  return {
    modal: {
      display: 'flex',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: theme.zIndex.dialog,
      top: 0,
      left: 0,
    },
    overlay: {
      zIndex: -1,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: lightBlack,
    },
  };
});

export default class Modal extends Component {

  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
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
      className,
      onRequestClose,
      open,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <ReactOverlaysModal
        className={ClassNames(classes.modal, className)}
        backdropClassName={classes.overlay}
        onHide={onRequestClose}
        show={open}
        transition={Fade}
        {...other}
      >
        {children}
      </ReactOverlaysModal>
    );
  }
}
