import React, {Component, PropTypes} from 'react';
import TimeDisplay from './TimeDisplay';
import ClockHours from './ClockHours';
import ClockMinutes from './ClockMinutes';

class Clock extends Component {
  static propTypes = {
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    isActive: PropTypes.bool,
    mode: PropTypes.oneOf(['hour', 'minute']),
    onChangeHours: PropTypes.func,
    onChangeMinutes: PropTypes.func,
  };

  static defaultProps = {
    initialTime: new Date(),
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    selectedTime: this.props.initialTime || new Date(),
    mode: 'hour',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTime: nextProps.initialTime || new Date(),
    });
  }

  setMode = (mode) => {
    setTimeout(() => {
      this.setState({
        mode: mode,
      });
    }, 100);
  };

  handleSelectAffix = (affix) => {
    if (affix === this.getAffix()) return;

    const hours = this.state.selectedTime.getHours();

    if (affix === 'am') {
      this.handleChangeHours(hours - 12, affix);
      return;
    }

    this.handleChangeHours(hours + 12, affix);
  };

  getAffix() {
    if (this.props.format !== 'ampm') return '';

    const hours = this.state.selectedTime.getHours();
    if (hours < 12) {
      return 'am';
    }

    return 'pm';
  }

  handleChangeHours = (hours, finished) => {
    const time = new Date(this.state.selectedTime);
    let affix;

    if ( typeof finished === 'string' ) {
      affix = finished;
      finished = undefined;
    }
    if (!affix) {
      affix = this.getAffix();
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
  };

  handleChangeMinutes = (minutes) => {
    const time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time,
    });

    const {onChangeMinutes} = this.props;
    if (typeof (onChangeMinutes) === 'function') {
      setTimeout(() => {
        onChangeMinutes(time);
      }, 0);
    }
  };

  getSelectedTime() {
    return this.state.selectedTime;
  }

  render() {
    let clock = null;

    const {prepareStyles} = this.context.muiTheme;

    const styles = {
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
        backgroundColor: this.context.muiTheme.timePicker.clockCircleColor,
      },
    };

    if ( this.state.mode === 'hour') {
      clock = (
        <ClockHours
          key="hours"
          format={this.props.format}
          onChange={this.handleChangeHours}
          initialHours={this.state.selectedTime.getHours()}
        />
      );
    } else {
      clock = (
        <ClockMinutes
          key="minutes"
          onChange={this.handleChangeMinutes}
          initialMinutes={this.state.selectedTime.getMinutes()}
        />
      );
    }

    return (
      <div style={prepareStyles(styles.root)}>
        <TimeDisplay
          selectedTime={this.state.selectedTime}
          mode={this.state.mode}
          format={this.props.format}
          affix={this.getAffix()}
          onSelectAffix={this.handleSelectAffix}
          onSelectHour={this.setMode.bind(this, 'hour')}
          onSelectMin={this.setMode.bind(this, 'minute')}
        />
        <div style={prepareStyles(styles.container)} >
          <div style={prepareStyles(styles.circle)} />
          {clock}
        </div>
      </div>
    );
  }
}

export default Clock;
