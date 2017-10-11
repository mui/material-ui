import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from 'material-ui';

const CalendarHeader = (props) => {
  const { classes, currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.clone().add(1, 'months'));
  const selectPreviousMonth = () => onMonthChange(currentMonth.clone().subtract(1, 'months'));

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton onClick={selectPreviousMonth}>
            keyboard_arrow_left
        </IconButton>

        <div className={classes.monthName}>
          { currentMonth.format('MMMM')}
        </div>

        <IconButton onClick={selectNextMonth}>
            keyboard_arrow_right
        </IconButton>
      </div>

      <div className={classes.daysHeader} />
    </div>
  );
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const styles = {
  switchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
};

export default withStyles(styles)(CalendarHeader);

