import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import {
  StyleRules,
  MuiStyles,
  useTheme,
  WithStyles,
  withStyles,
  alpha,
} from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import { ExtendMui } from '../internal/pickers/typings/helpers';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';

export type PickersDayClassKey =
  | 'root'
  | 'dayWithMargin'
  | 'dayOutsideMonth'
  | 'hiddenDaySpacingFiller'
  | 'today'
  | 'selected'
  | 'disabled';

export const styles: MuiStyles<PickersDayClassKey> = (theme): StyleRules<PickersDayClassKey> => ({
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
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
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
  selected: {},
  disabled: {},
});

export interface PickersDayProps<TDate> extends ExtendMui<ButtonBaseProps> {
  /**
   * If `true`, keyboard control and focus management is enabled.
   */
  allowKeyboardControl?: boolean;
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection?: boolean;
  /**
   * The date to show.
   */
  day: TDate;
  /**
   * If `true`, renders as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday?: boolean;
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   * @default false
   */
  disableMargin?: boolean;
  isAnimating?: boolean;
  onDayFocus?: (day: TDate) => void;
  onDaySelect: (day: TDate, isFinish: PickerSelectionState) => void;
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: boolean;
  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected?: boolean;
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth?: boolean;
  /**
   * If `true`, renders as today date.
   * @default false
   */
  today?: boolean;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const noop = () => {};

const PickersDay = React.forwardRef(function PickersDay<TDate>(
  props: PickersDayProps<TDate> & WithStyles<typeof styles>,
  forwardedRef: React.Ref<HTMLButtonElement>,
) {
  const {
    allowKeyboardControl,
    allowSameDateSelection = false,
    autoFocus = false,
    classes,
    className,
    day,
    disabled = false,
    disableHighlightToday = false,
    disableMargin = false,
    hidden,
    isAnimating,
    onClick,
    onDayFocus = noop,
    onDaySelect,
    onFocus,
    onKeyDown,
    outsideCurrentMonth,
    selected = false,
    showDaysOutsideCurrentMonth = false,
    today: isToday = false,
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const ref = React.useRef<HTMLButtonElement>(null);
  const handleRef = useForkRef(ref, forwardedRef);

  // Since this is rendered when a Popper is opened we can't use passive effects.
  // Focusing in passive effects in Popper causes scroll jump.
  useEnhancedEffect(() => {
    if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) {
      // ref.current being null would be a bug in Material-UI
      ref.current!.focus();
    }
  }, [autoFocus, disabled, isAnimating, outsideCurrentMonth]);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (onDayFocus) {
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

  const theme = useTheme();

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (onKeyDown !== undefined) {
      onKeyDown(event);
    }

    if (!allowKeyboardControl) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        onDayFocus(utils.addDays(day, -7));
        event.preventDefault();
        break;
      case 'ArrowDown':
        onDayFocus(utils.addDays(day, 7));
        event.preventDefault();
        break;
      case 'ArrowLeft':
        onDayFocus(utils.addDays(day, theme.direction === 'ltr' ? -1 : 1));
        event.preventDefault();
        break;
      case 'ArrowRight':
        onDayFocus(utils.addDays(day, theme.direction === 'ltr' ? 1 : -1));
        event.preventDefault();
        break;
      case 'Home':
        onDayFocus(utils.startOfWeek(day));
        event.preventDefault();
        break;
      case 'End':
        onDayFocus(utils.endOfWeek(day));
        event.preventDefault();
        break;
      case 'PageUp':
        onDayFocus(utils.getNextMonth(day));
        event.preventDefault();
        break;
      case 'PageDown':
        onDayFocus(utils.getPreviousMonth(day));
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  const dayClassName = clsx(
    classes.root,
    {
      [classes.selected]: selected,
      [classes.dayWithMargin]: !disableMargin,
      [classes.today]: !disableHighlightToday && isToday,
      [classes.dayOutsideMonth]: outsideCurrentMonth && showDaysOutsideCurrentMonth,
    },
    className,
  );

  if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) {
    return <div className={clsx(dayClassName, classes.hiddenDaySpacingFiller)} />;
  }

  return (
    <ButtonBase
      ref={handleRef}
      centerRipple
      data-mui-test="day"
      disabled={disabled}
      aria-label={utils.format(day, 'fullDate')}
      tabIndex={selected ? 0 : -1}
      className={dayClassName}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...other}
    >
      {utils.format(day, 'dayOfMonth')}
    </ButtonBase>
  );
});

export const areDayPropsEqual = (
  prevProps: PickersDayProps<any>,
  nextProps: PickersDayProps<any>,
) => {
  return (
    prevProps.autoFocus === nextProps.autoFocus &&
    prevProps.isAnimating === nextProps.isAnimating &&
    prevProps.today === nextProps.today &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.selected === nextProps.selected &&
    prevProps.allowKeyboardControl === nextProps.allowKeyboardControl &&
    prevProps.disableMargin === nextProps.disableMargin &&
    prevProps.showDaysOutsideCurrentMonth === nextProps.showDaysOutsideCurrentMonth &&
    prevProps.disableHighlightToday === nextProps.disableHighlightToday &&
    prevProps.className === nextProps.className &&
    prevProps.outsideCurrentMonth === nextProps.outsideCurrentMonth &&
    prevProps.onDayFocus === nextProps.onDayFocus &&
    prevProps.onDaySelect === nextProps.onDaySelect
  );
};

PickersDay.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, keyboard control and focus management is enabled.
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,
  /**
   * If `true`, renders as disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   * @default false
   */
  disableMargin: PropTypes.bool,
  /**
   * @ignore
   */
  hidden: PropTypes.bool,
  /**
   * @ignore
   */
  isAnimating: PropTypes.bool,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onDayFocus: PropTypes.func,
  /**
   * @ignore
   */
  onDaySelect: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * If `true`, renders as today date.
   * @default false
   */
  today: PropTypes.bool,
} as any;

/**
 *
 * Demos:
 *
 * - [Date Picker](https://material-ui.com/components/date-picker/)
 *
 * API:
 *
 * - [PickersDay API](https://material-ui.com/api/pickers-day/)
 */
export default withStyles(styles, { name: 'MuiPickersDay' })(
  React.memo(PickersDay, areDayPropsEqual),
) as <TDate>(props: PickersDayProps<TDate> & React.RefAttributes<HTMLButtonElement>) => JSX.Element;
