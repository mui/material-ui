var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ClockPointer = React.createClass({

  mixins: [StylePropable],
  
  contextTypes: {
    muiTheme: React.PropTypes.object
  },
  
  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute'])
  },

  getInitialState: function () {
     return {
        inner: this.isInner(this.props.value)
    };
  },
  getDefaultProps: function() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false
    };
  },
  componentWillReceiveProps: function (nextProps) {
      
  	this.setState({
        inner: this.isInner(nextProps.value)
  	});
  },
  isInner: function(value){
	if(this.props.type != "hour" ) {
		return false;
	}
	return value < 1 || value > 12 ;
  },
  getAngle: function(){

  	if(this.props.type == "hour"){
  		return this.calcAngle(this.props.value, 12);
  	}
  	
  	return this.calcAngle(this.props.value, 60);

  },
  calcAngle: function(value, base){  	
  	value %= base;
  	var angle = 360 / base * value;
  	return angle;

  },
  getTheme: function() {
    return this.context.muiTheme.component.timePicker;
  },
  render: function() {

  	if(this.props.value == null){
  		return <span />;
  	}

  	var angle = this.getAngle();

    var styles = {
      root: {
        height: "30%",
        background: this.getTheme().accentColor,
        width: "2px",
        left: 'calc(50% - 1px)',
        position: "absolute",
        bottom: "50%",
        transformOrigin: "bottom",
        pointerEvents: "none",
        transform: "rotateZ(" + angle + "deg)"
      },
      mark: {
        background:  this.getTheme().selectTextColor,
        border: "4px solid " +  this.getTheme().accentColor,
        width: "7px",
        height: "7px",
        position: "absolute",
        top: "-5px",
        left: "-6px",
        borderRadius: "100%",
      }
    };


    if(!this.state.inner ){
      styles.root.height = "40%"; 
    }

    if(this.props.hasSelected){
      styles.mark.display = "none";
    }

    return (
        <div style={styles.root} >
          <div style={styles.mark} />
        </div>        
    );
  }
});

module.exports = ClockPointer;
