import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import withUtils from '../_shared/WithUtils';

export const CalendarHeader = (props) => {
  const {
    classes,
    theme,
    currentMonth,
    onMonthChange,
    leftArrowIcon,
    rightArrowIcon,
    disablePrevMonth,
    disableNextMonth,
    utils,
  } = props;

  const rtl = theme.direction === 'rtl';

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(currentMonth));
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(currentMonth));

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton disabled={disablePrevMonth} onClick={selectPreviousMonth}>
          <Icon>{rtl ? rightArrowIcon : leftArrowIcon}</Icon>
        </IconButton>

        <Typography variant="body1">
          {utils.getCalendarHeaderText(currentMonth)}
        </Typography>

        <IconButton disabled={disableNextMonth} onClick={selectNextMonth}>
          <Icon>{rtl ? leftArrowIcon : rightArrowIcon}</Icon>
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, index) => (
          <Typography
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="caption"
            className={classes.dayLabel}
          >
            {day}
          </Typography>
        ))}
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  disablePrevMonth: PropTypes.bool,
  disableNextMonth: PropTypes.bool,
  utils: PropTypes.object.isRequired,
};

CalendarHeader.defaultProps = {
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  disablePrevMonth: false,
  disableNextMonth: false,
};

const styles = theme => ({
  switchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.unit,
  },
  daysHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 16,
  },
  dayLabel: {
    width: 36,
    margin: '0 2px',
    textAlign: 'center',
    color: theme.palette.text.hint,
  },
});

export default withStyles(
  styles,
  { withTheme: true, name: 'MuiPickersCalendarHeader' },
)(withUtils()(CalendarHeader));
