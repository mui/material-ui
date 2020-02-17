import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { makeStyles, fade } from '@material-ui/core/styles';
import { ButtonBase, ButtonBaseProps } from '@material-ui/core';

export const useStyles = makeStyles(
  theme => ({
    day: {
      margin: '1px 2px',
      width: 36,
      height: 36,
      borderRadius: '50%',
      padding: 0,
      color: theme.palette.text.primary,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
      '&:focus': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
        '&$daySelected': {
          willChange: 'background-color',
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
    today: {
      '&:not($daySelected)': {
        border: `1px solid ${theme.palette.text.hint}`,
      },
    },
    daySelected: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        willChange: 'background-color',
        backgroundColor: theme.palette.primary.dark,
      },
    },
    dayDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
    dayLabel: {
      // need for overrides
    },
  }),
  { name: 'MuiPickersDay' }
);

export interface DayProps extends ButtonBaseProps {
  /** The date to show */
  day: MaterialUiPickersDate;
  /** Is focused by keyboard navigation */
  focused?: boolean;
  /** Can be focused by tabbing in */
  focusable?: boolean;
  /** Is day in current month */
  isInCurrentMonth: boolean;
  /** Is switching month animation going on right now */
  isAnimating: boolean;
  /** Is today? */
  isToday?: boolean;
  /** Disabled? */
  disabled?: boolean;
  /** Selected? */
  selected?: boolean;
  /** Is keyboard control and focus management enabled */
  allowKeyboardControl?: boolean;
}

export const Day: React.FC<DayProps> = ({
  day,
  disabled,
  isInCurrentMonth,
  isToday,
  selected,
  focused = false,
  focusable = false,
  isAnimating,
  onFocus,
  allowKeyboardControl,
  ...other
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const utils = useUtils();
  const classes = useStyles();
  const className = clsx(classes.day, {
    [classes.hidden]: !isInCurrentMonth,
    [classes.today]: isToday,
    [classes.daySelected]: selected,
    [classes.dayDisabled]: disabled,
  });

  React.useEffect(() => {
    if (
      focused &&
      !isAnimating &&
      !disabled &&
      isInCurrentMonth &&
      ref.current &&
      allowKeyboardControl
    ) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, disabled, focused, isAnimating, isInCurrentMonth]);

  return (
    <ButtonBase
      aria-hidden={!isInCurrentMonth}
      ref={ref}
      centerRipple
      data-mui-test="day"
      aria-label={utils.format(day, 'fullDate')}
      tabIndex={focused || focusable ? 0 : -1}
      className={className}
      onFocus={e => {
        if (!focused && onFocus) {
          onFocus(e);
        }
      }}
      {...other}
    >
      <span className={classes.dayLabel}>{utils.format(day, 'dayOfMonth')}</span>
    </ButtonBase>
  );
};

Day.displayName = 'Day';

Day.propTypes = {
  isToday: PropTypes.bool,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  selected: PropTypes.bool,
};

Day.defaultProps = {
  disabled: false,
  hidden: false,
  isToday: false,
  selected: false,
};

export default Day;
