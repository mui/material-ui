import React, {Component, PropTypes} from 'react';
import SlidingSheet from '../internal/SlidingSheet';
import propTypes from '../utils/propTypes';

class Drawer extends Component {
  static propTypes = {
    /**
     * The contents of the `Drawer`.
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
     * If true, swiping sideways when the `Drawer` is closed will not open it.
     */
    disableSwipeToOpen: PropTypes.bool,
    /**
     * If true, the `Drawer` will be docked. In this state, the overlay won't show and
     * clicking on a menu item will not close the `Drawer`.
     */
    docked: PropTypes.bool,
    /**
     * Callback function fired when the `open` state of the `Drawer` is requested to be changed.
     *
     * @param {boolean} open If true, the `Drawer` was requested to be opened.
     * @param {string} reason The reason for the open or close request. Possible values are
     * 'swipe' for open requests; 'clickaway' (on overlay clicks),
     * 'escape' (on escape key press), and 'swipe' for close requests.
     */
    onRequestChange: PropTypes.func,
    /**
     * If true, the `Drawer` is opened.  Providing a value will turn the `Drawer`
     * into a controlled component.
     */
    open: PropTypes.bool,
    /**
     * If true, the `Drawer` is positioned to open from the opposite side.
     */
    openSecondary: PropTypes.bool,
    /**
     * The CSS class name to add to the `Overlay` component that is rendered behind the `Drawer`.
     */
    overlayClassName: PropTypes.string,
    /**
     * Override the inline-styles of the `Overlay` component that is rendered behind the `Drawer`.
     */
    overlayStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The width of the left most (or right most) area in pixels where the `Drawer` can be
     * swiped open from. Setting this to `null` spans that area to the entire page
     * (**CAUTION!** Setting this property to `null` might cause issues with sliders and
     * swipeable `Tabs`: use at your own risk).
     */
    swipeAreaWidth: PropTypes.number,
    /**
     * The width of the `Drawer` in pixels. Defaults to using the values from theme.
     */
    width: PropTypes.number,
    /**
     * The zDepth of the `Drawer`.
     */
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    disableSwipeToOpen: false,
    docked: true,
    open: null,
    openSecondary: false,
    swipeAreaWidth: 30,
    width: null,
    zDepth: 2,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({
      open: (this.props.open !== null ) ? this.props.open : this.props.docked,
    });
  }

  componentWillReceiveProps(nextProps) {
    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) {
      this.setState({
        open: nextProps.open,
      });
      // Otherwise, if docked is changed, change the open state for when uncontrolled.
    } else if (this.props.docked !== nextProps.docked) {
      this.setState({
        open: nextProps.docked,
      });
    }
  }

  close(reason) {
    if (this.props.open === null) this.setState({open: false});
    if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
    return this;
  }

  open(reason) {
    if (this.props.open === null) this.setState({open: true});
    if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
    return this;
  }

  handleRequestChange = (open, reason) => {
    if (open) {
      this.open(reason);
    } else {
      this.close(reason);
    }
  };

  render() {
    const {
      children,
      className,
      containerClassName,
      containerStyle,
      disableSwipeToOpen,
      docked,
      openSecondary,
      overlayClassName,
      overlayStyle,
      style,
      swipeAreaWidth,
      width,
      zDepth,
      ...other,
    } = this.props;

    return (
      <SlidingSheet
        className={className}
        closeable={!docked}
        containerClassName={containerClassName}
        containerStyle={Object.assign({backgroundColor: this.context.muiTheme.drawer.color}, containerStyle)}
        direction={openSecondary ? 'right' : 'left'}
        modal={!docked}
        onRequestChange={this.handleRequestChange}
        open={this.state.open}
        overlayClassName={overlayClassName}
        overlayStyle={overlayStyle}
        primaryDimension={width || this.context.muiTheme.drawer.width}
        style={style}
        swipeAreaWidth={swipeAreaWidth}
        swipeToOpen={!docked && !disableSwipeToOpen}
        zDepth={zDepth}
        {...other}
      >
        {children}
      </SlidingSheet>
    );
  }
}

export default Drawer;
