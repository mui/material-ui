// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import TimeDisplay from './TimeDisplay';
import ClockHours from './ClockHours';
import ClockMinutes from './ClockMinutes';

export const styleSheet = createStyleSheet('Clock', (theme) => {
  return {
    clock: {
      userSelect: 'none',
    },
    container: {
      width: '280px',
      height: '280px',
      padding: '0px',
      position: 'relative',
      boxSizing: 'content-box',
    },
    circle: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: '260px',
      height: '260px',
      borderRadius: '100%',
      backgroundColor: theme.palette.background.status,
    },
  };
});

class Clock extends Component {
  static propTypes = {
    className: PropTypes.string,
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    onChangeHours: PropTypes.func,
    onChangeMinutes: PropTypes.func,
  };

  static defaultProps = {
    initialTime: new Date(),
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'Clock';

  state = {
    selectedTime: null,
    mode: 'hour',
  };

  componentWillMount() {
    this.setState({
      selectedTime: this.props.initialTime || new Date(),
    });
  }

  setMode = (mode) => {
    setTimeout(() => {
      this.setState({
        mode,
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
    let tmpHours = 0;
    if (typeof hours === 'number') {
      tmpHours = hours;
    }

    if (typeof finished === 'string') {
      affix = finished;
      finished = undefined;
    }
    if (!affix) {
      affix = this.getAffix();
    }
    if (affix === 'pm' && tmpHours < 12) {
      tmpHours += 12;
    }

    time.setHours(tmpHours);
    this.setState({
      selectedTime: time,
    });

    if (finished) {
      setTimeout(() => {
        this.setState({
          mode: 'minute',
        });

        const { onChangeHours } = this.props;
        if (onChangeHours) {
          onChangeHours(time);
        }
      }, 100);
    }
  };

  handleChangeMinutes = (minutes, finish) => {
    const time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time,
    });

    const { onChangeMinutes } = this.props;
    if (finish && onChangeMinutes) {
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
    const { className: classNameProp } = this.props;
    if (this.state.mode === 'hour') {
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
    const classes = this.context.styleManager.render(styleSheet);
    const clockClassName = classNames(classes.clock, classNameProp);
    return (
      <div className={clockClassName}>
        <TimeDisplay
          selectedTime={this.state.selectedTime}
          mode={this.state.mode}
          format={this.props.format}
          affix={this.getAffix()}
          onSelectAffix={this.handleSelectAffix}
          onSelectHour={() => { this.setMode('hour'); }}
          onSelectMin={() => { this.setMode('minute'); }}
        />
        <div className={classNames({ [classes.container]: true })} >
          <div className={classNames({ [classes.circle]: true })} />
          {clock}
        </div>
      </div>
    );
  }
}

export default Clock;
