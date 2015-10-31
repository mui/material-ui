const React = require('react');
const StylePropable = require('../mixins/style-propable');
const TimeDisplay = require("./time-display");
const ClockButton = require("./clock-button");
const ClockHours = require("./clock-hours");
const ClockMinutes = require("./clock-minutes");


const Clock = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onChangeMinutes: React.PropTypes.func,
    onChangeHours: React.PropTypes.func,
    initialTime: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    isActive: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      initialTime: new Date(),
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTime: nextProps.initialTime,
    });
  },

  getInitialState() {
    return {
      selectedTime: this.props.initialTime,
      mode: 'hour',
    };
  },

  _setMode(mode) {
    setTimeout(() => {
        this.setState({
          mode: mode,
        });
    }, 100);
  },

  _setAffix(affix) {
    if (affix === this._getAffix()) return;

    let hours = this.state.selectedTime.getHours();

    if (affix === "am") {
      this.handleChangeHours(hours - 12, affix);
      return;
    }

    this.handleChangeHours(hours + 12, affix);
  },

  _getAffix() {
    if (this.props.format !== "ampm") return "";

    let hours = this.state.selectedTime.getHours();
    if (hours < 12) {
      return "am";
    }

    return "pm";
  },

  _getButtons() {
    let buttons = [];
    let isAM = this._getIsAM();

    if (this.props.format === 'ampm'){
      buttons = [
        <ClockButton key="AM" position="left" onTouchTap={this._setAffix.bind(this, "am")} selected={isAM} >{"AM"}</ClockButton>,
        <ClockButton key="PM" position="right" onTouchTap={this._setAffix.bind(this, "pm")} selected={!isAM} >{"PM"}</ClockButton>,
      ];
    }
    return buttons;
  },

  _getIsAM() {
    return this._getAffix() === "am";
  },

  render() {
    let clock = null;
    let buttons = this._getButtons();

    let styles = {
      root: {},

      container: {
        height: 280,
        padding: 10,
      },
    };

    if ( this.state.mode === "hour") {
      clock = <ClockHours key="hours"
                format={this.props.format}
                onChange={this.handleChangeHours}
                initialHours={this.state.selectedTime.getHours()} />;
    }
    else {
      clock = <ClockMinutes key="minutes"
                onChange={this.handleChangeMinutes}
                initialMinutes={this.state.selectedTime.getMinutes()} />;
    }

    return (
      <div style={this.prepareStyles(styles.root)}>
        <TimeDisplay
          selectedTime={this.state.selectedTime}
          mode={this.state.mode}
          format={this.props.format}
          affix={this._getAffix()}
          onSelectHour={this._setMode.bind(this, 'hour')}
          onSelectMin={this._setMode.bind(this, 'minute')} />

        <div style={this.prepareStyles(styles.container)} >
          {clock}
        </div>

       {buttons}
      </div>
    );
  },

  handleChangeHours(hours, finished) {
    let time = new Date(this.state.selectedTime);
    let affix;

    if ( typeof finished === 'string' ) {
      affix = finished;
      finished = undefined;
    }
    if (!affix) {
      affix = this._getAffix();
    }
    if (affix === 'pm' && hours < 12) {
      hours += 12;
    }

    time.setHours(hours);
    this.setState({
      selectedTime: time,
    });
    
    const { onChangeHours } = this.props;
    
    if (finished) {
      setTimeout(() => {
        this.setState({
          mode: 'minute',
        });
        if (typeof(onChangeHours) === 'function') {
          onChangeHours(time);
        }
      }, 100);
    }
  },

  handleChangeMinutes(minutes) {
    let time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time,
    });

    const { onChangeMinutes } = this.props;
    if (typeof(onChangeMinutes) === 'function') {
        setTimeout(() => { onChangeMinutes(time); }, 0);
      }
  },

  getSelectedTime() {
    return this.state.selectedTime;
  },
});

module.exports = Clock;
