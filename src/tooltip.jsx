let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let Colors = require('./styles/colors');


let Tooltip = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool
  },

  componentDidMount: function() {
    this._setRippleSize();
  },

  componentDidUpdate: function() {
    this._setRippleSize();
  },

  getStyles: function(){
    let styles = {
      root: {
        position: 'absolute',
        fontFamily: this.context.muiTheme.contentFontFamily,
        fontSize: '10px',
        lineHeight: '22px',
        padding: '0 8px',
        color: Colors.white,
        overflow: 'hidden',
        top: -10000,
        borderRadius: 2,
        userSelect: 'none',
        opacity: 0,
        transition:
          Transitions.easeOut('0ms', 'top', '450ms') + ',' +
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms')
      },
      label: {
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      ripple: {
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition:
          Transitions.easeOut('0ms', 'width', '450ms') + ',' +
          Transitions.easeOut('0ms', 'height', '450ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      },
      rootWhenShown: {
        top: -16,
        opacity: 1,
        transform: 'translate3d(0px, 16px, 0px)',
        transition:
          Transitions.easeOut('0ms', 'top', '0ms') + ',' +
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms'),
      },
      rootWhenTouched: {
        fontSize: '14px',
        lineHeight: '44px',
        padding: '0 16px'
      },
      rippleWhenShown: {
        backgroundColor: Colors.grey600,
        transition:
          Transitions.easeOut('450ms', 'width', '0ms') + ',' +
          Transitions.easeOut('450ms', 'height', '0ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      }
    };
    return styles;
  },

  render: function() {
    let {
      label,
      ...other } = this.props;
    let styles = this.getStyles();
    return (
      <div {...other}
        style={this.mergeAndPrefix(
            styles.root,
            this.props.show && styles.rootWhenShown,
            this.props.touch && styles.rootWhenTouched,
            this.props.style
          )}>
        <div
          ref="ripple"
          style={this.mergeAndPrefix(
            styles.ripple,
            this.props.show && styles.rippleWhenShown)} />
        <span style={this.mergeAndPrefix(styles.label)}>{this.props.label}</span>
      </div>
    );
  },

  _setRippleSize: function() {
    let ripple = React.findDOMNode(this.refs.ripple);
    let tooltip = window.getComputedStyle(React.findDOMNode(this));
    let tooltipWidth = parseInt(tooltip.getPropertyValue("width"), 10);
    let tooltipHeight = parseInt(tooltip.getPropertyValue("height"), 10);

    let rippleDiameter = (Math.sqrt(Math.pow(tooltipHeight, 2) +
                                    Math.pow((tooltipWidth / 2.0), 2) ) * 2);

    if (this.props.show) {
      ripple.style.height = rippleDiameter + 'px';
      ripple.style.width = rippleDiameter + 'px';
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  }

});

module.exports = Tooltip;
