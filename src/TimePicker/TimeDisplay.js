// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('TimeDisplay', (theme) => {
  return {
    root: {
      padding: '14px 0',
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      backgroundColor: theme.palette.primary[500],
      color: 'white',
    },
    rootLandscape: {
      position: 'absolute',
      left: '0px',
      bottom: '0px',
      height: '100%',
      width: '200px',
    },
    text: {
      margin: '6px 0',
      lineHeight: '58px',
      height: '58px',
      fontSize: '58px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
    },
    textLandscape: {
      display: 'inline-block',
      position: 'relative',
      left: '20px',
      top: '50px',
    },
    time: {
      margin: '0 10px',
    },
    affix: {
      flex: 1,
      position: 'relative',
      lineHeight: '17px',
      height: '17px',
      fontSize: '17px',
      marginRight: '10px',
    },
    affixLandscape: {
      position: 'absolute',
      left: '67px',
      top: '80px',
    },
    affixTop: {
      position: 'absolute',
      top: '-20px',
      left: 0,
    },
    clickable: {
      cursor: 'pointer',
    },
    inactive: {
      opacity: '0.7',
    },
  };
});
const sanitizeTime = (props) => {
  let hour = props.selectedTime.getHours();
  let min = props.selectedTime.getMinutes().toString();

  if (props.format === 'ampm') {
    hour %= 12;
    hour = hour || 12;
  }

  hour = hour.toString();
  if (hour.length < 2) hour = `0${hour}`;
  if (min.length < 2) min = `0${min}`;

  return [hour, min];
};

const TimeDisplay = (props, context) => {
  const {
      affix,
      format,
      mode,
      landscape,
      onSelectAffix,
      onSelectHour,
      onSelectMin,
      selectedTime, // eslint-disable-line no-unused-vars
      ...other
    } = props;

  const [hour, min] = sanitizeTime(props);
  const classes = context.styleManager.render(styleSheet);

  const classNamePm = classNames(classes.clickable, {
    [classes.inactive]: affix !== 'pm',
  });

  let buttons = [];
  if (format === 'ampm') {
    buttons = [
      <div
        key="pm"
        className={classNamePm}
        onTouchEnd={() => onSelectAffix('pm')}
        onMouseUp={() => onSelectAffix('pm')}
      >
        {'PM'}
      </div>,
      <div
        key="am"
        className={classNames(classes.affixTop, classes.clickable, { [classes.inactive]: affix !== 'am' })}
        onTouchEnd={() => onSelectAffix('am')}
        onMouseUp={() => onSelectAffix('am')}
      >
        {'AM'}
      </div>,
    ];
  }

  const affixClassName = classNames(classes.affix, { [classes.affixLandscape]: landscape });
  return (
    <div {...other} className={classNames(classes.root, { [classes.rootLandscape]: landscape })}>
      <div className={classNames(classes.text, { [classes.textLandscape]: landscape })}>
        <div className={affixClassName} />
        <div className={classNames(classes.time)}>
          <span
            className={classNames(classes.clickable, { [classes.inactive]: mode !== 'hour' })}
            onTouchEnd={onSelectHour}
            onMouseUp={onSelectHour}
          >
            {hour}
          </span>
          <span>:</span>
          <span
            className={classNames(classes.clickable, { [classes.inactive]: mode !== 'minute' })}
            onTouchEnd={onSelectMin}
            onMouseUp={onSelectMin}
          >
            {min}
          </span>
        </div>
        <div className={affixClassName}>
          {buttons}
        </div>
      </div>
    </div>
  );
};

TimeDisplay.propTypes = {
  affix: PropTypes.oneOf(['', 'pm', 'am']),
  format: PropTypes.oneOf(['ampm', '24hr']),
  landscape: PropTypes.bool,
  mode: PropTypes.oneOf(['hour', 'minute']),
  onSelectAffix: PropTypes.func,
  onSelectHour: PropTypes.func,
  onSelectMin: PropTypes.func,
  selectedTime: PropTypes.object.isRequired,
};

TimeDisplay.defaultProps = {
  affix: '',
  mode: 'hour',
};

TimeDisplay.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

TimeDisplay.muiName = 'TimeDisplay';

export default TimeDisplay;
