var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');

var Tooltip = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool
  },

  componentDidMount: function() {
    this._setRippleSize();
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._setRippleSize();
  },

  /** Styles */

  _main: function() {
    var style = {
      position: 'absolute',
      fontFamily: "'Roboto'",
      fontSize: '10px',
      lineHeight: '22px',
      padding: '0 8px',
      color: CustomVariables.colors.white,
      overflow: 'hidden',
      top: -10000,
      borderRadius: 2,
      userSelect: 'none',
      opacity: 0,
      transition:
        Transitions.easeOut('0ms', 'top', '450ms') + ',' +
        Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
        Transitions.easeOut('450ms', 'opacity', '0ms'),
    };

    if (this.props.show) {
      style = this.mergeAndPrefix(style, {
        top: -16,
        opacity: 1,
        transform: 'translate3d(0px, 16px, 0px)',
        transition:
          Transitions.easeOut('0ms', 'top', '0ms') + ',' + 
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms'),
          });
    }

    if (this.props.touch) {
      style = this.mergeAndPrefix(style, {
        fontSize: '14px',
        lineHeight: '44px',
        padding: '0 16px',
      });
    }

    return this.mergeAndPrefix(style);
  },

  _label: function() {
    return {
      position: 'relative',
      whiteSpace: 'nowrap',
    }
  },

  _ripple: function() {
    var style = {
      position: 'absolute',
      left: '50%',
      top: 0,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition:
        Transitions.easeOut('0ms', 'width', '450ms') + ',' +
        Transitions.easeOut('0ms', 'height', '450ms') + ',' +
        Transitions.easeOut('450ms', 'backgroundColor', '0ms'),
    };

    if (this.props.show) {
      style = this.mergeAndPrefix(style, {
        backgroundColor: CustomVariables.colors.grey600,
        transition:
          Transitions.easeOut('450ms', 'width', '0ms') + ',' +
          Transitions.easeOut('450ms', 'height', '0ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms'),
      });
    }

    return style;
  },


  render: function() {
    var {
      label,
      ...other } = this.props;

    return (
      <div {...other} style={this._main()}>
        <div ref="ripple" style={this._ripple()} />
        <span style={this._label()}>{this.props.label}</span>
      </div>
    );
  },

  _setRippleSize: function() {
    var ripple = this.refs.ripple.getDOMNode();

    var tooltip = window.getComputedStyle(this.getDOMNode());
    var tooltipWidth = parseInt(tooltip.getPropertyValue("width"), 10);
    var tooltipHeight = parseInt(tooltip.getPropertyValue("height"), 10);

    var rippleDiameter = (Math.sqrt(Math.pow(tooltipHeight, 2) + 
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