import React from 'react';
import StylePropable from '../mixins/style-propable';
import TimeDisplay from './time-display';
import ClockButton from './clock-button';
import ClockHours from './clock-hours';
import ClockMinutes from './clock-minutes';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';


const Clock = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    initialTime: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    onChangeHours: React.PropTypes.func,
    onChangeMinutes: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      initialTime: new Date(),
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      selectedTime: nextProps.initialTime,
    });
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
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

    if (affix === 'am') {
      this.handleChangeHours(hours - 12, affix);
      return;
    }

    this.handleChangeHours(hours + 12, affix);
  },

  _getAffix() {
    if (this.props.format !== 'ampm') return '';

    let hours = this.state.selectedTime.getHours();
    if (hours < 12) {
      return 'am';
    }

    return 'pm';
  },

  _getButtons() {
    let buttons = [];
    let isAM = this._getIsAM();

    if (this.props.format === 'ampm') {
      buttons = [
        <ClockButton key="AM" position="left" onTouchTap={this._setAffix.bind(this, 'am')} selected={isAM}>
          {"AM"}
        </ClockButton>,
        <ClockButton key="PM" position="right" onTouchTap={this._setAffix.bind(this, 'pm')} selected={!isAM}>
          {"PM"}
        </ClockButton>,
      ];
    }
    return buttons;
  },

  _getIsAM() {
    return this._getAffix() === 'am';
  },

  render() {
    let clock = null;
    let buttons = this._getButtons();

    let styles = {
      root: {},

      container: {
        height: 280,
        padding: 10,
        position: 'relative',
      },

      circle: {
        position: 'absolute',
        top: 20,
        width: 260,
        height: 260,
        borderRadius: '100%',
        backgroundColor: this.state.muiTheme.timePicker.clockCircleColor,
      },
    };

    if ( this.state.mode === 'hour') {
      clock = (
        <ClockHours key="hours"
          format={this.props.format}
          onChange={this.handleChangeHours}
          initialHours={this.state.selectedTime.getHours()} />
        );
    }
    else {
      clock = (
        <ClockMinutes key="minutes"
          onChange={this.handleChangeMinutes}
          initialMinutes={this.state.selectedTime.getMinutes()} />
      );
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
          <div style={this.prepareStyles(styles.circle)} />
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

    const {onChangeHours} = this.props;

    if (finished) {
      setTimeout(() => {
        this.setState({
          mode: 'minute',
        });
        if (typeof (onChangeHours) === 'function') {
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

    const {onChangeMinutes} = this.props;
    if (typeof (onChangeMinutes) === 'function') {
      setTimeout(() => { onChangeMinutes(time); }, 0);
    }
  },

  getSelectedTime() {
    return this.state.selectedTime;
  },
});

export default Clock;
