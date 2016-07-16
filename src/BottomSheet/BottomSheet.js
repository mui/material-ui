import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import EventListener from 'react-event-listener';
import SlidingSheet from '../internal/SlidingSheet';

class BottomSheet extends Component {
  static propTypes = {
    /**
     * The contents of the `BottomSheet`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The CSS class name of the container element.
     */
    containerClassName: PropTypes.string,
    /**
     * Override the inline-styles of the container element.
     */
    containerStyle: PropTypes.object,
    /**
     * If true, the `BottomSheet` will be modal.
     */
    modal: PropTypes.bool,
    /**
     * Callback function fired when the `BottomSheet` is requested to be closed. If
     * not provided, the `BottomSheet` will persist unless closed through the `open`
     * prop.
     *
     * @param {string} reason The reason for the close request. Possible values are
     * 'clickaway' (on overlay clicks), 'escape' (on escape key press), and 'swipe'
     * (when swiping down).
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, the `BottomSheet` is opened.
     */
    open: PropTypes.bool.isRequired,
    /**
     * The CSS class name to add to the `Overlay` component that is rendered behind the `BottomSheet`.
     */
    overlayClassName: PropTypes.string,
    /**
     * Override the inline-styles of the `Overlay` component that is rendered behind the `BottomSheet`.
     */
    overlayStyle: PropTypes.object,
    /**
     * The minimum interval between resize events.
     */
    resizeInterval: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The width of the `BottomSheet` in pixels, if it should be inset. If not set, the sheet will be
     * full-width.
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    modal: false,
    open: false,
    resizeInterval: 166, // 10 frames at 60 Hz.
    width: '100%',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({
      height: null,
    });
  }

  componentDidMount() {
    this.updateHeight();
  }

  componentWillReceiveProps() {
    this.updateHeight();
  }

  componentWillUnmount() {
    clearTimeout(this.deferTimer);
  }

  handleResize = () => {
    // Debounce the resize.
    clearTimeout(this.deferTimer);
    this.deferTimer = setTimeout(() => {
      this.updateHeight();
    }, this.props.resizeInterval);
  };

  updateHeight = () => {
    this.setState({
      height: findDOMNode(this.sheet.refs.clickAwayableElement).offsetHeight,
    });
  };

  handleRequestChange = (open, reason) => {
    // Bottom sheets can't request open
    this.updateHeight();

    if (!open && this.props.onRequestClose) {
      this.props.onRequestClose(reason);
    }
  };

  render() {
    const {
      children,
      className,
      containerClassName,
      containerStyle,
      modal,
      open,
      overlayClassName,
      overlayStyle,
      style,
      width,
      ...other,
    } = this.props;

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <SlidingSheet
          {...other}
          ref={(sheet) => this.sheet = sheet}
          className={className}
          closeable={!!this.props.onRequestClose}
          containerClassName={containerClassName}
          containerStyle={Object.assign({
            backgroundColor: this.context.muiTheme.bottomSheet.color,
            width: width,
            margin: '0 auto',
          }, containerStyle)}
          direction="bottom"
          modal={modal}
          onRequestChange={this.handleRequestChange}
          open={open}
          overlayClassName={overlayClassName}
          overlayStyle={overlayStyle}
          primaryDimension={this.state.height}
          style={style}
          zDepth={modal ? 2 : 1}
        >
          {children}
        </SlidingSheet>
      </EventListener>
    );
  }
}

export default BottomSheet;
