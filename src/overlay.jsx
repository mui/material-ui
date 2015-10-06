const React = require('react');
const ReactDOM = require('react-dom');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const Colors = require('./styles/colors');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');


const Overlay = React.createClass({

  _originalBodyOverflow: '',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  propTypes: {
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool,
    transitionEnabled: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true,
    };
  },

  componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.overflow;
  },

  componentDidUpdate() {
    if (this.props.autoLockScrolling) {
      if (this.props.show) {
        this._preventScrolling();
      } else {
        this._allowScrolling();
      }
    }
  },

  componentWillUnmount() {
    this._allowScrolling();
  },

  setOpacity(opacity) {
    let overlay = ReactDOM.findDOMNode(this);
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

    let styles = this.prepareStyles(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown);

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
