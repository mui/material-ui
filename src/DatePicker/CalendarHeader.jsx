import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles, IconButton } from 'material-ui';

const CalendarHeader = (props) => {
  const { classes, currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.clone().add(1, 'months'));
  const selectPreviousMonth = () => onMonthChange(currentMonth.clone().subtract(1, 'months'));
  console.log();
  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton onClick={selectPreviousMonth}>
          keyboard_arrow_left
        </IconButton>

        <div className={classes.monthName}>
          { currentMonth.format('MMMM YYYY')}
        </div>

        <IconButton onClick={selectNextMonth}>
            keyboard_arrow_right
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        { moment.weekdaysMin().map(day => (
          <div className={classes.dayLabel}> { day } </div>
        ))}
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
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
});

export default withStyles(styles)(CalendarHeader);

