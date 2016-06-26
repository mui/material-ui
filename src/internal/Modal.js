import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Overlay from './Overlay';
import Portal from './Portal';
import Fade from '../Animation/Fade';

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
    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: React.PropTypes.func,
    onRequestClose: PropTypes.func,
    show: PropTypes.bool,
  };

  static defaultProps = {
    show: false,
    overlay: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    exited: false,
  };

  // componentDidMount() {
  //   if (this.props.show === true) {
  //     this.onShow();
  //   }
  // }

  componentWillMount() {
    if (!this.props.show) {
      this.setState({exited: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && this.state.exited) {
      this.setState({exited: false});
    } else {
      this.setState({exited: true});
    }
  }

  handleOverlayClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    // if (this.props.onOverlayClick) {
    //   this.props.onOverlayClick(event);
    // }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(event);
    }
  };

  handleOverlayExited = (...args) => {
    this.setState({exited: true});
    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  };

  render() {
    const {
      children,
      className,
      onRequestClose, // eslint-disable-line no-unused-vars
      show,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const mount = show || !this.state.exited;

    if (!mount) {
      return null;
    }

    return (
      <Portal open={true}>
        <div
          className={ClassNames(classes.modal, className)}
          {...other}
        >
          <Fade
            in={show}
            transitionAppear={true}
            onExited={this.handleOverlayExited}
          >
            <Overlay onClick={this.handleOverlayClick} />
          </Fade>
          {children}
        </div>
      </Portal>
    );
  }
}
