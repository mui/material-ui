import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import Colors from './styles/colors';

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

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true,
      style: {},
    };
  },

  componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.overflow;
    if (this.props.show) {
      this._applyAutoLockScrolling(this.props);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this._applyAutoLockScrolling(nextProps);
    }
  },

  componentWillUnmount() {
    this._allowScrolling();
  },

  _originalBodyOverflow: '',

  setOpacity(opacity) {
    let overlay = ReactDOM.findDOMNode(this);
    overlay.style.opacity = opacity;
  },

  getStyles() {
    return {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: '-100%',
        opacity: 0,
        backgroundColor: Colors.lightBlack,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

        // Two ways to promote overlay to its own render layer
        willChange: 'opacity',
        transform: 'translateZ(0)',

        transition:
          this.props.transitionEnabled &&
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'opacity'),
      },
      rootWhenShown: {
        left: '0',
        opacity: 1,
        transition:
          this.props.transitionEnabled &&
          Transitions.easeOut('0ms', 'left') + ',' +
          Transitions.easeOut('400ms', 'opacity'),
      },
    };
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

    const styles = this.prepareStyles(this.getStyles().root, style, show && this.getStyles().rootWhenShown);

    return (
      <div {...other} style={styles} />
    );
  },

});

export default Overlay;
