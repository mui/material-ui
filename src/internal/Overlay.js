import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';
import transitions from '../styles/transitions';

function getStyles(props, state) {
  const {overlay} = state.muiTheme;

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

const Overlay = React.createClass({

  propTypes: {
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    transitionEnabled: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true,
      style: {},
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  componentDidMount() {
    if (this.props.show) {
      this._applyAutoLockScrolling(this.props);
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if (this.props.show !== nextProps.show) {
      this._applyAutoLockScrolling(nextProps);
    }
  },

  componentWillUnmount() {
    if (this.props.show === true) {
      this._allowScrolling();
    }
  },

  setOpacity(opacity) {
    this.refs.overlay.style.opacity = opacity;
  },

  _applyAutoLockScrolling(props) {
    if (props.autoLockScrolling) {
      if (props.show) {
        this._preventScrolling();
      } else {
        this._allowScrolling();
      }
    }
  },

  _preventScrolling() {
    const body = document.getElementsByTagName('body')[0];
    this._originalBodyOverflow = body.style.overflow;

    body.style.overflow = 'hidden';
  },

  _allowScrolling() {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = this._originalBodyOverflow || '';
  },

  render() {
    const {
      show,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <div {...other} ref="overlay" style={prepareStyles(Object.assign(styles.root, style))} />
    );
  },

});

export default Overlay;
