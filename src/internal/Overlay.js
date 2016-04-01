import React from 'react';
import transitions from '../styles/transitions';

function getStyles(props, context) {
  const {overlay} = context.muiTheme;

  const style = {
    root: {
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: '-100%',
      opacity: 0,
      backgroundColor: overlay.backgroundColor,
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // Remove mobile color flashing (deprecated)

      // Two ways to promote overlay to its own render layer
      willChange: 'opacity',
      transform: 'translateZ(0)',

      transition:
        props.transitionEnabled && `${transitions.easeOut('0ms', 'left', '400ms')}, ${
          transitions.easeOut('400ms', 'opacity')}`,
    },
  };

  if (props.show) {
    Object.assign(style.root, {
      left: 0,
      opacity: 1,
      transition: `${transitions.easeOut('0ms', 'left')}, ${
        transitions.easeOut('400ms', 'opacity')}`,
    });
  }

  return style;
}

class Overlay extends React.Component {
  static propTypes = {
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    transitionEnabled: React.PropTypes.bool,
  };

  static defaultProps = {
    autoLockScrolling: true,
    transitionEnabled: true,
    style: {},
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.show) {
      this.applyAutoLockScrolling(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.applyAutoLockScrolling(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.props.show === true) {
      this.allowScrolling();
    }
  }

  setOpacity(opacity) {
    this.refs.overlay.style.opacity = opacity;
  }

  applyAutoLockScrolling(props) {
    if (props.autoLockScrolling) {
      if (props.show) {
        this.preventScrolling();
      } else {
        this.allowScrolling();
      }
    }
  }

  preventScrolling() {
    const body = document.getElementsByTagName('body')[0];
    this.originalBodyOverflow = body.style.overflow;

    body.style.overflow = 'hidden';
  }

  allowScrolling() {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = this.originalBodyOverflow || '';
  }

  render() {
    const {
      show, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div {...other} ref="overlay" style={prepareStyles(Object.assign(styles.root, style))} />
    );
  }
}

export default Overlay;
