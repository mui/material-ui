var React = require('react');
var StylePropable = require('../mixins/style-propable');
var ClockNumber = require("./clock-number");
var ClockPointer = require("./clock-pointer");

function rad2deg(rad){
  return rad * 57.29577951308232
}

var ClockHours = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    initialHours: React.PropTypes.number,
    onChange: React.PropTypes.func,
    format: React.PropTypes.oneOf(['ampm', '24hr'])
  },

  center: {x: 0, y: 0},
  basePoint: {x: 0, y: 0},
  isMousePressed: function(e){

    if(typeof e.buttons == "undefined"){
      return e.nativeEvent.which;
    }

    return e.buttons;

  },
  getDefaultProps: function() {
    return {
      initialHours: new Date().getHours(),
      onChange: function(){},
      format: 'ampm'
    };
  },

  componentDidMount: function () {
    var clockElement = React.findDOMNode(this.refs.mask);

      this.center = {
        x: clockElement.offsetWidth / 2,
        y: clockElement.offsetHeight / 2,
      };

      this.basePoint = {
        x: this.center.x,
        y: 0
      }; 
  },
  handleUp: function(e){
    e.preventDefault(); 
    this.setClock(e, true);
  },
  handleMove: function(e){
     e.preventDefault();
    if(this.isMousePressed(e) != 1 ) return;
    this.setClock(e, false);
  },
  handleTouch: function(e){
    e.preventDefault(); 
    this.setClock(e, false);
  },
  setClock: function(e, finish){
    var ne = e.nativeEvent;
     
    var pos = {
      x: ne.offsetX === undefined ? ne.layerX : ne.offsetX,
      y: ne.offsetY === undefined ? ne.layerY : ne.offsetY
    };
  
    var hours = this.getHours(pos.x, pos.y);
 
    this.props.onChange(hours, finish);

  },
  getHours: function(x, y){

    var step = 30;
    x = x - this.center.x;
    y = y - this.center.y;
    var cx = this.basePoint.x - this.center.x;
    var cy = this.basePoint.y - this.center.y;

    var atan = Math.atan2(cx, cy) -  Math.atan2(x, y);

    var deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    var value = Math.floor(deg / step) || 0;

    var delta = Math.pow(x, 2) + Math.pow(y, 2);
    var distance = Math.sqrt(delta);
    
    value = value || 12;
    if(this.props.format == "24hr"){
      if(distance < 90){
        value += 12;
        value %= 24;  
      }
    }else{
      value %= 12;
    }

    return value;

  },
  _getSelected: function(){

    var hour = this.props.initialHours;

    if(this.props.format == "ampm"){
      hour %= 12;
      hour = hour || 12;
    }

    return hour;
  },
  _getHourNumbers: function(){
    var style = {
      pointerEvents: "none"
    };  

    var hourSize = this.props.format == 'ampm' ? 12 : 24;

    var hours = [];

    for(var i = 1; i <= hourSize; i++){
      hours.push(i % 24);
    }

    return hours.map(function(hour){ 

      var isSelected = this._getSelected() == hour;  
      return <ClockNumber style={style}  isSelected={isSelected} type="hour" value={hour} />;

    }.bind(this));

  },
 
  render: function() {

    var styles = {
      root: {
        height: "100%",
        width: "100%",
        borderRadius: "100%",
        position: "relative",
        pointerEvents: "none",
        boxSizing: "border-box",
      },

      hitMask: {
        height: "100%",
        width: "100%",
        pointerEvents: "auto",
      },

    };


    var hours = this._getSelected();
    var numbers = this._getHourNumbers();
   
    return (
      <div ref="clock" style={this.mergeAndPrefix(styles.root)} >
        <ClockPointer hasSelected={true} value={hours} type="hour" />
        {numbers}        
        <div ref="mask" style={this.mergeAndPrefix(styles.hitMask)} onTouchMove={this.handleTouch} onTouchEnd={this.handleUp} onMouseUp={this.handleUp} onMouseMove={this.handleMove}/>
      </div>
    );
  }
});

module.exports = ClockHours;
