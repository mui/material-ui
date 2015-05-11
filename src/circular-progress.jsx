var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Animations = require("./styles/animations");
var Transitions = require("./styles/transitions");

var CircularProgress = React.createClass({

  mixins: [StylePropable],

  propTypes: {
      mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
      value: React.PropTypes.number,
      min:  React.PropTypes.number,
      max:  React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  _getRelativeValue: function(){
    var value = this.props.value;
    var min = this.props.min;
    var max = this.props.max;

    var clampedValue = Math.min(Math.max(min, value), max);
    var rangeValue = max - min;
    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  componentWillMount: function () {
        
    Animations.create("circ-progress-outer-rotate", {
      "100%": { transform: "rotate(360deg)" }
    });

    Animations.create("circ-progress-left-wobble", {
      "0%": { transform: "rotate(130deg)" },
      "50%": { transform: "rotate( -5deg)" },
      "100%": { transform: "rotate(130deg)" }
    }); 

    Animations.create("circ-progress-right-wobble", {
      "0%": { transform: "rotate(-130deg)" },
      "50%": { transform: "rotate( 5deg)" },
      "100%": { transform: "rotate(-130deg)" }
    });

    Animations.create("circ-progress-sporadic-rotate", {
      "12.5%": { transform: "rotate( 135deg)" },
      "25%": { transform: "rotate( 270deg)" },
      "37.5%": { transform: "rotate( 405deg)" },
      "50%": { transform: "rotate( 540deg)" },
      "62.5%": { transform: "rotate( 675deg)" },
      "75%": { transform: "rotate( 810deg)" },
      "87.5%": { transform: "rotate( 945deg)" },
      "100%": { transform: "rotate(1080deg)" }
    });
 

  },

  getDefaultProps: function () {
      return {
          mode: "indeterminate",
          value: 0,
          min: 0,
          max: 100  
      };
  },
  
  getTheme: function() {
    return this.context.muiTheme.palette;
  },

  getStyles: function(size) {
     
    var easeInOut = "cubic-bezier(0.35, 0, 0.25, 1)";                                                   
    size = size || 50;
    var duration = 5250;
    var circleDuration = duration * 0.25;
    var outerDuration = duration * (5 / 9);
    var sporadicDuration = duration;

    var styles = {
      root: {
        width: size + "px",
        height: size + "px",
        display: "inline-block",
        position: "relative",
        paddingTop: 0 ,
        margin: 5,
        overflow: "hidden"
      },
      wrapper: {},
      inner :{
        width: size + "px",
        height: size + "px",
        position: "relative"
      },
      gap: {
        position: "absolute",
        left: (size * 0.5 - 1) + "px",
        right: (size * 0.5 - 1) + "px",
        top: 0,
        bottom: 0,
        borderTop: "5px solid " + this.getTheme().primary3Color,
        boxSizing: "border-box",
      },
      left: {
        position: "absolute",
        top: 0,
        height: size + "px",
        width: (size * 0.5) + "px",
        overflow: "hidden",
        left: 0
      },
      right: {
        position: "absolute",
        top: 0,
        height: size + "px",
        width: (size * 0.5) + "px",
        overflow: "hidden",
        right: 0
      },
      leftHalfCircle: {
        position: "absolute",
        top: 0,
        width: size + "px",
        height: size + "px",
        boxSizing: "border-box",
        border: "5px solid " + this.getTheme().primary1Color,
        borderBottomColor: "transparent",
        borderRadius: "50%",
        left: 0,
        borderRightColor: "transparent"
      },
      rightHalfCircle: {
        position: "absolute",
        top: 0,
        width: size + "px",
        height: size + "px",
        boxSizing: "border-box",
        border: "5px solid " + this.getTheme().primary1Color,
        borderBottomColor: "transparent",
        borderRadius: "50%",
        right: 0,
        borderLeftColor: "transparent"
      }
    };

    if(this.props.mode == "determinate"){
      var relValue = this._getRelativeValue();

      styles.gap.borderBottom = "5px solid " + this.getTheme().primary1Color;

      if(relValue <= 50){
        var rightDeg = Math.round(relValue / 50 * 180 - 135);
      
        styles.leftHalfCircle.transform = "rotate(135deg)";
      
        styles.rightHalfCircle.transition = Transitions.create("transform", "0.1s", null, "linear");
        styles.rightHalfCircle.transform = "rotate(" + rightDeg + "deg)";
        styles.gap.borderBottom = "transparent";
      }else{
        var leftDeg = Math.round((relValue - 50) / 50 * 180 + 135);
        
        styles.leftHalfCircle.transition = Transitions.create("transform", "0.1s", null, "linear");
        styles.leftHalfCircle.transform = "rotate(" + leftDeg + "deg)";

        styles.rightHalfCircle.transform = "rotate(45deg)";
        styles.gap.transition = Transitions.create("border-bottom-color", "0.1s", null, "linear");

      }

    }else{
      halfCircleAnimation =  Math.round(duration * 0.25) + "ms " + easeInOut + " infinite";
      styles.wrapper.animation = "circ-progress-outer-rotate " + Math.round(outerDuration) + "ms linear infinite";
      styles.inner.animation = "circ-progress-sporadic-rotate " + sporadicDuration + "ms " + easeInOut + " infinite";
      styles.leftHalfCircle.animation = "circ-progress-left-wobble " + halfCircleAnimation;
      styles.rightHalfCircle.animation = "circ-progress-right-wobble " + halfCircleAnimation;
    }
    
    return styles;
  },

  render: function() {
    var {
      style,
      size,
      ...other
    } = this.props;

    size = size || 1;
    var styles = this.getStyles(Math.round(size * 50));

    return (
      <div  {...other} style={this.mergeAndPrefix(styles.root, style)}>
        <div style={this.mergeAndPrefix(styles.wrapper)}>
          <div style={this.mergeAndPrefix(styles.inner)}>
            <div style={this.mergeAndPrefix(styles.gap)}></div>
            <div style={this.mergeAndPrefix(styles.left)}>
              <div style={this.mergeAndPrefix(styles.leftHalfCircle)}></div>
            </div>
            <div style={this.mergeAndPrefix(styles.right)}>
              <div style={this.mergeAndPrefix(styles.rightHalfCircle)}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CircularProgress;
