var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Colors = require('./styles/colors');

var Tooltip = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    label: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool,
    verticalDirection: React.PropTypes.oneOf(['up','down']),
    ripplePosition: React.PropTypes.oneOf(['left', 'right', 'center']),
    iconButtonTouch: React.PropTypes.bool
  },

  getDefaultProps: function(){
    return {
      verticalDirection: 'down',
      ripplePosition: 'center'
    };
  },

  componentDidMount: function() {
    this._setRippleSize();
  },

  componentDidUpdate: function() {
    this._setRippleSize();
  },

  getStyles: function(){
    var verticalDirection = this.props.verticalDirection;
    var ripplePosition = this.props.ripplePosition;
    var touchOffset = (this.props.iconButtonTouch) ? 30:20;
    var styles = {
      root: {
        position: 'absolute',
        fontFamily: this.context.muiTheme.contentFontFamily, 
        fontSize: 10,
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
        left: ripplePosition==='center' ? '50%' :
              ripplePosition==='right' ? '100%' : '0%',
        top: verticalDirection === 'down' ? 0 : (touchOffset)+'px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition:
          Transitions.easeOut('0ms', 'width', '450ms') + ',' +
          Transitions.easeOut('0ms', 'height', '450ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      },
      rootWhenShown: {
        top: verticalDirection === 'down' ? -16 : 16,
        opacity: 1,
        transform: verticalDirection === 'down' ?
          'translate3d(0px, 16px, 0px)' :
          'translate3d(0px, -16px, 0px)',
        transition:
          Transitions.easeOut('0ms', 'top', '0ms') + ',' +
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms'),
      },
      rootWhenTouched: {
        fontSize: 14,
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

    var {
      label,
      show, 
      touch,
      style,
      verticalDirection,
      ...other
    } = this.props;

    var styles = this.getStyles();
    var mergedRootStyles = this.mergeAndPrefix(
      styles.root,
      show && styles.rootWhenShown,
      touch && styles.rootWhenTouched,
      style
    );
    var mergedInnerStyles = this.mergeAndPrefix(
      styles.ripple,
      show && styles.rippleWhenShown
    );

    return (
      <div {...other}
        style={mergedRootStyles}>
        <div
          ref="ripple"
          style={mergedInnerStyles} />
        <span style={this.mergeAndPrefix(styles.label)}>{label}</span>
      </div>
    );
  },

  _setRippleSize: function() {
    var ripple = React.findDOMNode(this.refs.ripple);
    var tooltip = window.getComputedStyle(React.findDOMNode(this));
    var tooltipWidth = parseInt(tooltip.getPropertyValue("width"), 10);
    var tooltipHeight = parseInt(tooltip.getPropertyValue("height"), 10);

    var rippleDiameter; 
    if(this.props.ripplePosition === 'center')
      rippleDiameter = (Math.sqrt(Math.pow(tooltipHeight, 2) +
                          Math.pow((tooltipWidth / 2.0), 2) ) * 2);
    else
      rippleDiameter = (Math.sqrt(Math.pow(tooltipHeight, 2) +
                          Math.pow((tooltipWidth), 2) ) * 2);
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
