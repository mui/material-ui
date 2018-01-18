import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import * as defaultUtils from '../utils/utils';

export const CalendarHeader = (props) => {
  const {
    classes,
    theme,
    currentMonth,
    onMonthChange,
    leftArrowIcon,
    rightArrowIcon,
    utils,
  } = props;

  const rtl = theme.direction === 'rtl';

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(currentMonth));
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(currentMonth));

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton onClick={selectPreviousMonth}>
          {rtl ? rightArrowIcon : leftArrowIcon}
        </IconButton>

        <Typography type="body1">
          {utils.getCalendarHeaderText(currentMonth)}
        </Typography>

        <IconButton onClick={selectNextMonth}>
          {rtl ? leftArrowIcon : rightArrowIcon}
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, index) => (
          <Typography
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="caption"
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
  utils: PropTypes.object,
};

CalendarHeader.defaultProps = {
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  utils: defaultUtils,
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
)(CalendarHeader);
