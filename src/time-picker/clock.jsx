var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TimeDisplay = require("./time-display");
var ClockButton = require("./clock-button");
var ClockHours = require("./clock-hours");
var ClockMinutes = require("./clock-minutes");
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var Clock = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    initialTime: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    isActive: React.PropTypes.bool
  },
 
  init: function(){
    this.setState({
      mode: 'hour'
    })
  },

  getDefaultProps: function() {
    return {
      initialTime: new Date() 
    };
  },

  componentWillReceiveProps: function (nextProps) {
   
    this.setState({
      selectedTime: nextProps.initialTime
    });
  },

  getInitialState: function() {

    return {
      selectedTime: this.props.initialTime,
      mode: 'hour'  
    };
  },


  _setMode: function(mode){
    setTimeout(function(){
        this.setState({
          mode: mode
        })
      }.bind(this), 100);
  },
 
  _setAffix: function(affix){

    if(affix == this._getAffix()) return;

    var hours = this.state.selectedTime.getHours();

    if(affix == "am"){
      this.handleChangeHours(hours - 12);
      return;
    }

    this.handleChangeHours(hours + 12);
  },

  _getAffix: function(){

    if(this.props.format != "ampm") return "";

    var hours = this.state.selectedTime.getHours();
    if(hours < 12){
      return "am";
    }

    return "pm";

  },

  _getButtons: function(){
    var buttons = [];
    var isAM = this._getIsAM();
   
    if(this.props.format == 'ampm'){
      buttons = [
        <ClockButton position="left" onTouchTap={this._setAffix.bind(this, "am")} selected={isAM} >{"AM"}</ClockButton>,
        <ClockButton position="right" onTouchTap={this._setAffix.bind(this, "pm")} selected={!isAM} >{"PM"}</ClockButton>
      ];
    }
    return buttons; 
  },

  _getIsAM: function(){

    return this._getAffix() == "am";

  },

  render: function() {

    var clock = null;
    var buttons = this._getButtons(); 

    var styles = {
      root: {},

      container: {
        height: "280px",
        padding: "10px",
      }
    };



    if( this.state.mode == "hour"){
      clock = <ClockHours key="hours"
                format={this.props.format}
                onChange={this.handleChangeHours}
                initialHours={this.state.selectedTime.getHours()} />
    }else{
      clock = <ClockMinutes key="minutes"
                onChange={this.handleChangeMinutes}
                initialMinutes={this.state.selectedTime.getMinutes()} />
   
    }


    return (
      <div style={styles.root} >
        
        <TimeDisplay 
          selectedTime={this.state.selectedTime}
          mode={this.state.mode}
          format={this.props.format}
          affix={this._getAffix()}
          onSelectHour={this._setMode.bind(this, 'hour')}
          onSelectMin={this._setMode.bind(this, 'minute')}
           />
        
        <div
          style={styles.container} >
          {clock}
        </div> 
       {buttons}
      </div>
    );
  },
  handleChangeHours: function(hours, finished){
    var time = new Date(this.state.selectedTime);
     
    time.setHours(hours);
    this.setState({
      selectedTime: time
    });    

    if(finished){
      setTimeout(function(){
        this.setState({
          mode: 'minute'
        })
      }.bind(this), 100);
    }
  },
  handleChangeMinutes: function(minutes){
    var time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time
    });
  },
  getSelectedTime: function(){
    return this.state.selectedTime;
  }
});

module.exports = Clock;