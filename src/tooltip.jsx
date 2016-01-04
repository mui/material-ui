import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import Colors from './styles/colors';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const Tooltip = React.createClass({

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    horizontalPosition: React.PropTypes.oneOf(['left', 'right', 'center']),
    label: React.PropTypes.node.isRequired,
    show: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    touch: React.PropTypes.bool,
    verticalPosition: React.PropTypes.oneOf(['top', 'bottom']),
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getInitialState() {
    return {
      offsetWidth: null,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._setRippleSize();
    this._setTooltipPosition();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    this._setTooltipPosition();

    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentDidUpdate() {
    this._setRippleSize();
  },

  getStyles() {
    let verticalPosition = this.props.verticalPosition;
    let horizontalPosition = this.props.horizontalPosition;
    let touchMarginOffset = this.props.touch ? 10 : 0;
    let touchOffsetTop = this.props.touch ? -20 : -10;
    let offset = verticalPosition === 'bottom' ?
      14 + touchMarginOffset : -14 - touchMarginOffset;

    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;

    let styles = {
      root: {
        position: 'absolute',
        fontFamily: rawTheme.fontFamily,
        fontSize: '10px',
        lineHeight: '22px',
        padding: '0 8px',
        zIndex: muiTheme.zIndex.tooltip,
        color: Colors.white,
        overflow: 'hidden',
        top: -10000,
        borderRadius: 2,
        userSelect: 'none',
        opacity: 0,
        right: horizontalPosition === 'left' ? 12 : null,
        left: horizontalPosition === 'center' ?
          (this.state.offsetWidth - 48) / 2 * -1 : null,
        transition:
          Transitions.easeOut('0ms', 'top', '450ms') + ',' +
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms'),
      },
      label: {
        position: 'relative',
        whiteSpace: 'nowrap',
      },
      ripple: {
        position: 'absolute',
        left: horizontalPosition === 'center' ? '50%' :
          horizontalPosition === 'left' ? '100%' : '0%',
        top: verticalPosition === 'bottom' ? 0 : '100%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition:
          Transitions.easeOut('0ms', 'width', '450ms') + ',' +
          Transitions.easeOut('0ms', 'height', '450ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms'),
      },
      rootWhenShown: {
        top: verticalPosition === 'top' ?
          touchOffsetTop : 36,
        opacity: 0.9,
        transform: 'translate3d(0px, ' + offset + 'px, 0px)',
        transition:
          Transitions.easeOut('0ms', 'top', '0ms') + ',' +
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms'),
      },
      rootWhenTouched: {
        fontSize: '14px',
        lineHeight: '32px',
        padding: '0 16px',
      },
      rippleWhenShown: {
        backgroundColor: Colors.grey700,
        transition:
          Transitions.easeOut('450ms', 'width', '0ms') + ',' +
          Transitions.easeOut('450ms', 'height', '0ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms'),
      },
    };

    return styles;
  },

  _setRippleSize() {
    let ripple = ReactDOM.findDOMNode(this.refs.ripple);
    let tooltip = window.getComputedStyle(ReactDOM.findDOMNode(this));
    let tooltipWidth = parseInt(tooltip.getPropertyValue('width'), 10) /
      (this.props.horizontalPosition === 'center' ? 2 : 1);
    let tooltipHeight = parseInt(tooltip.getPropertyValue('height'), 10);

    let rippleDiameter = Math.ceil((Math.sqrt(Math.pow(tooltipHeight, 2) +
                                    Math.pow(tooltipWidth, 2) ) * 2));
    if (this.props.show) {
      ripple.style.height = rippleDiameter + 'px';
      ripple.style.width = rippleDiameter + 'px';
    }
    else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  },

  _setTooltipPosition() {
    let tooltip = ReactDOM.findDOMNode(this);
    this.setState({offsetWidth: tooltip.offsetWidth});
  },

  render() {
    const {
      label,
      ...other,
    } = this.props;
    const styles = this.getStyles();

    return (
      <div
        {...other}
        style={this.prepareStyles(
          styles.root,
          this.props.show && styles.rootWhenShown,
          this.props.touch && styles.rootWhenTouched,
          this.props.style
        )}
      >
        <div
          ref="ripple"
          style={this.prepareStyles(
            styles.ripple,
            this.props.show && styles.rippleWhenShown)} />
        <span style={this.prepareStyles(styles.label)}>
          {label}
        </span>
      </div>
    );
  },

});

export default Tooltip;
