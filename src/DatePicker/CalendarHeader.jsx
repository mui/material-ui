import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles, IconButton } from 'material-ui';

export const CalendarHeader = (props) => {
  const {
    classes,
    currentMonth,
    onMonthChange,
    leftArrowIcon,
    rightArrowIcon,
  } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.clone().add(1, 'months'));
  const selectPreviousMonth = () => onMonthChange(currentMonth.clone().subtract(1, 'months'));

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton onClick={selectPreviousMonth}>
          {leftArrowIcon || 'keyboard_arrow_left'}
        </IconButton>

        <div className={classes.monthName}>
          { currentMonth.format('MMMM YYYY')}
        </div>

        <IconButton onClick={selectNextMonth}>
          {rightArrowIcon || 'keyboard_arrow_right'}
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        { moment.weekdaysMin().map(day => (
          <div key={day} className={classes.dayLabel}> { day } </div>
        ))}
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  leftArrowIcon: PropTypes.string,
  rightArrowIcon: PropTypes.string,
};

CalendarHeader.defaultProps = {
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
};

const styles = theme => ({
  switchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0 20px',
  },
  daysHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    width: 36,
    margin: '0 2px',
    fontSize: 13,
    textAlign: 'center',
    color: theme.palette.text.hint,
  },
  monthName: {
    color: theme.palette.text.primary,
  },
});

export default withStyles(styles)(CalendarHeader, { name: 'MuiPickersCalendarHeader' });

