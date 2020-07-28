import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { makeStyles, fade } from '@material-ui/core/styles';
import { ExtendMui } from '../../typings/helpers';
import { onSpaceOrEnter } from '../../_helpers/utils';
import { useUtils } from '../../_shared/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
import { withDefaultProps } from '../../_shared/withDefaultProps';
import { useCanAutoFocus } from '../../_shared/hooks/useCanAutoFocus';
import { PickerSelectionState } from '../../_shared/hooks/usePickerState';

const muiComponentConfig = { name: 'MuiPickersDay' };

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      ...theme.typography.caption,
      width: DAY_SIZE,
      height: DAY_SIZE,
      borderRadius: '50%',
      padding: 0,
      // background required here to prevent collides with the other days when animating with transition group
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
      '&:focus': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
        '&$selected': {
          willChange: 'background-color',
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&$selected': {
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
      '&$disabled': {
        color: theme.palette.text.secondary,
      },
    },
    dayWithMargin: {
      margin: `0 ${DAY_MARGIN}px`,
    },
    dayOutsideMonth: {
      color: theme.palette.text.secondary,
    },
    hiddenDaySpacingFiller: {
      visibility: 'hidden',
    },
    today: {
      '&:not($selected)': {
        border: `1px solid ${theme.palette.text.secondary}`,
      },
    },
    dayLabel: {
      // need for overrides
    },
    selected: {},
    disabled: {},
  }),
  muiComponentConfig
);

export interface DayProps extends ExtendMui<ButtonBaseProps> {
  /**
   * The date to show.
   */
  day: unknown;
  /**
   * Is focused by keyboard navigation.
   */
  focused?: boolean;
  /**
   * Can be focused by tabbing in.
   */
  focusable?: boolean;
  /**
   * Is day in current month.
   */
  inCurrentMonth: boolean;
  /**
   * Is switching month animation going on right now.
   */
  isAnimating?: boolean;
  /**
   * Is today?
   */
  today?: boolean;
  /**
   * Disabled?.
   */
  disabled?: boolean;
  /**
   * Selected?
   */
  selected?: boolean;
  /**
   * Is keyboard control and focus management enabled.
   */
  allowKeyboardControl?: boolean;
  /**
   * Disable margin between days, useful for displaying range of days.
   */
  disableMargin?: boolean;
  /**
   * Display disabled dates outside the current month.
   *
   * @default false
   */
  showDaysOutsideCurrentMonth?: boolean;
  /**
   * Disable highlighting today date with a circle.
   *
   * @default false
   */
  disableHighlightToday?: boolean;
  /**
   * Allow selecting the same date (fire onChange even if same date is selected).
   *
   * @default false
   */
  allowSameDateSelection?: boolean;
  onDayFocus: (day: unknown) => void;
  onDaySelect: (day: unknown, isFinish: PickerSelectionState) => void;
}

const PureDay: React.FC<DayProps> = (props) => {
  const {
    allowKeyboardControl,
    allowSameDateSelection = false,
    className,
    day,
    disabled = false,
    disableHighlightToday = false,
    disableMargin = false,
    focusable = false,
    focused = false,
    hidden,
    inCurrentMonth: isInCurrentMonth,
    isAnimating,
    onClick,
    onDayFocus,
    onDaySelect,
    onFocus,
    onKeyDown,
    selected = false,
    showDaysOutsideCurrentMonth = false,
    today: isToday = false,
    ...other
  } = props;
  const utils = useUtils();
  const classes = useStyles();
  const canAutoFocus = useCanAutoFocus();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (
      focused &&
      !disabled &&
      !isAnimating &&
      isInCurrentMonth &&
      ref.current &&
      allowKeyboardControl &&
      canAutoFocus
    ) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, canAutoFocus, disabled, focused, isAnimating, isInCurrentMonth]);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!focused) {
      onDayFocus(day);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!allowSameDateSelection && selected) return;

    if (!disabled) {
      onDaySelect(day, 'finish');
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = onSpaceOrEnter(() => {
    if (!disabled) {
      onDaySelect(day, 'finish');
    }
  }, onKeyDown);

  const dayClassName = clsx(
    classes.root,
    {
      [classes.selected]: selected,
      [classes.dayWithMargin]: !disableMargin,
      [classes.today]: !disableHighlightToday && isToday,
      [classes.dayOutsideMonth]: !isInCurrentMonth && showDaysOutsideCurrentMonth,
    },
    className
  );

  if (!isInCurrentMonth && !showDaysOutsideCurrentMonth) {
    // Do not render button and not attach any listeners for empty days
    return <div aria-hidden className={clsx(dayClassName, classes.hiddenDaySpacingFiller)} />;
  }

  return (
    <ButtonBase
      ref={ref}
      centerRipple
      data-mui-test="day"
      disabled={disabled}
      aria-label={utils.format(day, 'fullDate')}
      tabIndex={focused || focusable ? 0 : -1}
      className={dayClassName}
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
    prevProps.inCurrentMonth === nextProps.inCurrentMonth &&
    prevProps.onDayFocus === nextProps.onDayFocus &&
    prevProps.onDaySelect === nextProps.onDaySelect
  );
};

PureDay.displayName = 'PickersDay';

PureDay.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  today: PropTypes.bool,
};

export const Day = withDefaultProps(muiComponentConfig, React.memo(PureDay, areDayPropsEqual));
