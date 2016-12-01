// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import TimeDisplay from './TimeDisplay';
import ClockQuadrant from './ClockQuadrant';

export const styleSheet = createStyleSheet('Clock', (theme) => {
  return {
    clock: {
      userSelect: 'none',
    },
    clockLandscape: {
      height: '280px',
      position: 'relative',
    },
    container: {
      width: '280px',
      height: '280px',
      padding: '0px',
      position: 'relative',
      boxSizing: 'content-box',
    },
    landscapeContainer: {
      position: 'absolute',
      right: '0px',
    },
    circle: {
      position: 'absolute',
      left: '10px',
      top: '10px',
      width: 'calc(100% - 20px)',
      height: 'calc(100% - 20px)',
      borderRadius: '100%',
      backgroundColor: theme.palette.background.status,
    },
  };
});

class Clock extends Component {
  static propTypes = {
    affix: PropTypes.oneOf(['', 'am', 'pm']),
    className: PropTypes.string,
    format: PropTypes.oneOf(['ampm', '24hr']),
    initialTime: PropTypes.object,
    landscape: PropTypes.bool,
    mode: PropTypes.oneOf(['hour', 'minute']),
    onChange: PropTypes.func,
    onSetAffix: PropTypes.func,
    onSetMode: PropTypes.func,
    selectedTime: PropTypes.object,
  };

  static defaultProps = {
    initialTime: new Date(),
    selectedTime: new Date(),
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const { className: classNameProp,
      landscape,
      mode,
      format,
      affix,
      onChange,
      onSetMode,
      onSetAffix,
      selectedTime } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const clockClassName = classNames(classes.clock, { [classes.clockLandscape]: landscape }, classNameProp);
    return (
      <div className={clockClassName}>
        <TimeDisplay
          selectedTime={selectedTime}
          landscape={landscape}
          mode={mode}
          format={format}
          affix={affix}
          onSelectAffix={onSetAffix}
          onSelectHour={() => { onSetMode('hour'); }}
          onSelectMin={() => { onSetMode('minute'); }}
        />
        <div className={classNames(classes.container, { [classes.landscapeContainer]: landscape })} >
          <div className={classNames({ [classes.circle]: true })} />
          <ClockQuadrant quadrantDimension={280} onChange={onChange} />
        </div>
      </div>
    );
  }
}

export default Clock;
