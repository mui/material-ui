let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let Colors = require('./styles/colors');


let Overlay = React.createClass({

  _originalBodyOverflow: '',

  mixins: [StylePropable],

  propTypes: {
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool,
    transitionEnabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true,
    };
  },

  componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
  },

  componentDidUpdate() {
    if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
  },

  componentWillUnmount() {
    this._allowScrolling();
  },

  setOpacity(opacity) {
    let overlay = React.findDOMNode(this);
    overlay.style.opacity = opacity;
  },

  getStyles() {
    let styles = {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: 9,
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
    return styles;
  },

  render() {
    let {
      show,
      style,
      ...other,
    } = this.props;

    let styles = this.mergeAndPrefix(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown);

    return (
      <div {...other} style={styles} />
    );
  },

  preventScrolling() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  },

  allowScrolling() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  },

  _preventScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },

  _allowScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = this._originalBodyOverflow || '';
  },

});

module.exports = Overlay;
