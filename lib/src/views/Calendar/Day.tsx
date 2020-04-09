import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { ExtendMui } from '../../typings/helpers';
import { onSpaceOrEnter } from '../../_helpers/utils';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { makeStyles, fade } from '@material-ui/core/styles';
import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
import { FORCE_FINISH_PICKER } from '../../_shared/hooks/usePickerState';

export const useStyles = makeStyles(
  theme => ({
    day: {
      width: DAY_SIZE,
      height: DAY_SIZE,
      borderRadius: '50%',
      padding: 0,
      // background required here to prevent collides with the other days when animating with transition group
      backgroundColor: theme.palette.background.paper,
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
    dayWithMargin: {
      margin: `0px ${DAY_MARGIN}px`,
    },
    dayOutsideMonth: {
      color: theme.palette.text.hint,
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

export interface DayProps extends ExtendMui<ButtonBaseProps> {
  /** The date to show */
  day: MaterialUiPickersDate;
  /** Is focused by keyboard navigation */
  focused?: boolean;
  /** Can be focused by tabbing in */
  focusable?: boolean;
  /** Is day in current month */
  inCurrentMonth: boolean;
  /** Is switching month animation going on right now */
  isAnimating?: boolean;
  /** Is today? */
  today?: boolean;
  /** Disabled? */
  disabled?: boolean;
  /** Selected? */
  selected?: boolean;
  /** Is keyboard control and focus management enabled */
  allowKeyboardControl?: boolean;
  /** Disable margin between days, useful for displaying range of days */
  disableMargin?: boolean;
  /**
   * Display disabled dates outside the current month
   * @default false
   */
  showDaysOutsideCurrentMonth?: boolean;
  /** Disable highlighting today date with a circle
   * @default false
   */
  disableHighlightToday?: boolean;
  onDayFocus: (day: MaterialUiPickersDate) => void;
  onDaySelect: (day: MaterialUiPickersDate, isFinish: boolean | symbol) => void;
}

const PureDay: React.FC<DayProps> = ({
  className,
  day,
  disabled,
  hidden,
  inCurrentMonth: isInCurrentMonth,
  today: isToday,
  selected,
  focused = false,
  focusable = false,
  isAnimating,
  onDayFocus,
  onDaySelect,
  onFocus,
  onClick,
  onKeyDown,
  disableMargin = false,
  allowKeyboardControl,
  disableHighlightToday = false,
  showDaysOutsideCurrentMonth = false,
  ...other
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const utils = useUtils();
  const classes = useStyles();

  React.useEffect(() => {
    if (
      focused &&
      !disabled &&
      !isAnimating &&
      isInCurrentMonth &&
      ref.current &&
      allowKeyboardControl
    ) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, disabled, focused, isAnimating, isInCurrentMonth]);

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!focused) {
      onDayFocus(day);
    }

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onDaySelect(day, true);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = onSpaceOrEnter(() => {
    if (!disabled) {
      onDaySelect(day, FORCE_FINISH_PICKER);
    }
  }, onKeyDown);

  const isHidden = !isInCurrentMonth && !showDaysOutsideCurrentMonth;
  return (
    <ButtonBase
      aria-hidden={isHidden}
      ref={ref}
      centerRipple
      data-mui-test="day"
      aria-label={utils.format(day, 'fullDate')}
      tabIndex={focused || focusable ? 0 : -1}
      className={clsx(
        classes.day,
        {
          [classes.daySelected]: selected,
          [classes.dayDisabled]: disabled,
          [classes.dayWithMargin]: !disableMargin,
          [classes.today]: !disableHighlightToday && isToday,
          [classes.hidden]: isHidden,
          [classes.dayOutsideMonth]: !isInCurrentMonth && showDaysOutsideCurrentMonth,
        },
        className
      )}
      {...other}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <span className={classes.dayLabel}>{utils.format(day, 'dayOfMonth')}</span>
    </ButtonBase>
  );
};

export const areDayPropsEqual = (prevProps: DayProps, nextProps: DayProps) => {
  return (
    prevProps.focused === nextProps.focused &&
    prevProps.focusable === nextProps.focusable &&
    prevProps.isAnimating === nextProps.isAnimating &&
    prevProps.today === nextProps.today &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.selected === nextProps.selected &&
    prevProps.allowKeyboardControl === nextProps.allowKeyboardControl &&
    prevProps.disableMargin === nextProps.disableMargin &&
    prevProps.showDaysOutsideCurrentMonth === nextProps.showDaysOutsideCurrentMonth &&
    prevProps.disableHighlightToday === nextProps.disableHighlightToday &&
    prevProps.className === nextProps.className &&
    prevProps.onDayFocus === nextProps.onDayFocus &&
    prevProps.onDaySelect === nextProps.onDaySelect
  );
};

export const Day = React.memo(PureDay, areDayPropsEqual);

PureDay.displayName = 'Day';

PureDay.propTypes = {
  today: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
};

PureDay.defaultProps = {
  disabled: false,
  today: false,
  selected: false,
};
