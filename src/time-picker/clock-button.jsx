var React = require('react');
var StylePropable = require('../mixins/style-propable');
var EnhancedButton = require('../enhanced-button');
var Transitions = require('../styles/transitions');

var ClockButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
      position: React.PropTypes.oneOf(['left', 'right'])
  },
  
  getDefaultProps: function () {
      return {
          position: "left"  
      };
  },
  _handleTouchTap: function(){
    
    this.setState({
      selected: true
    })
    this.props.onTouchTap();
  },
  getTheme: function() {
    return this.context.muiTheme.component.timePicker;
  },
  render: function() {
    
    var {
      className,
      ...other} = this.props;
    
    var styles = {
      root: {
        position: "absolute",
        bottom: "65px",
        pointerEvents: "auto",
        height: "50px", 
        width: "50px",
        borderRadius: "100%"
      },

      label : {
        position: "absolute",
        top: "17px",
        left: "14px"
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: "0px",
        left: "0px",
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if( this.props.position == "right" ){
      styles.root.right = "5px";
    }else{
      styles.root.left = "5px";
    }
      


    return (
        <EnhancedButton {...other}
          style={this.mergeAndPrefix(styles.root)}
          disableFocusRipple={true} 
          disableTouchRipple={true} 
          onTouchTap={this._handleTouchTap}> 
          <span  style={this.mergeAndPrefix(styles.select)} />
          <span  style={this.mergeAndPrefix(styles.label)} >{this.props.children}</span>
        </EnhancedButton> 
    );
  }
});

module.exports = ClockButton;