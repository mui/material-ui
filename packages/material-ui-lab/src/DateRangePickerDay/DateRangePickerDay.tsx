import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SxProps } from '@material-ui/system';
import { alpha, styled, Theme } from '@material-ui/core/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import PickersDay, { PickersDayProps, areDayPropsEqual } from '../PickersDay/PickersDay';

export interface DateRangePickerDayClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `isHighlighting=true` and `outsideCurrentMonth=false`. */
  rangeIntervalDayHighlight: string;
  /** Styles applied to the root element if `isStartOfHighlighting=true` or `day` is the start of the month. */
  rangeIntervalDayHighlightStart: string;
  /** Styles applied to the root element if `isEndOfHighlighting=true` or `day` is the end of the month. */
  rangeIntervalDayHighlightEnd: string;
  /** Styles applied to the preview element. */
  rangeIntervalPreview: string;
  /** Styles applied to the root element if `isPreviewing=true` and `outsideCurrentMonth=false`. */
  rangeIntervalDayPreview: string;
  /** Styles applied to the root element if `isStartOfPreviewing=true` or `day` is the start of the month. */
  rangeIntervalDayPreviewStart: string;
  /** Styles applied to the root element if `isEndOfPreviewing=true` or `day` is the end of the month. */
  rangeIntervalDayPreviewEnd: string;
  /** Styles applied to the day element. */
  day: string;
  /** Styles applied to the day element if `isHighlighting=false`. */
  dayOutsideRangeInterval: string;
  /** Styles applied to the day element if `selected=false` and `isHighlighting=true`. */
  dayInsideRangeInterval: string;
  /** Styles applied to the day element if `selected=false`. */
  notSelectedDate: string;
}

export type DateRangePickerDayClassKey = keyof DateRangePickerDayClasses;

export interface DateRangePickerDayProps<TDate> extends Omit<PickersDayProps<TDate>, 'classes'> {
  /**
   * Set to `true` if the `day` is in a highlighted date range.
   */
  isHighlighting: boolean;
  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isEndOfHighlighting: boolean;
  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isStartOfHighlighting: boolean;
  /**
   * Set to `true` if the `day` is in a preview date range.
   */
  isPreviewing: boolean;
  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isEndOfPreviewing: boolean;
  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isStartOfPreviewing: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DateRangePickerDayClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export function getDateRangePickerDayUtilityClass(slot: string) {
  return generateUtilityClass('MuiDateRangePickerDay', slot);
}

export const dateRangePickerDayClasses: DateRangePickerDayClasses = generateUtilityClasses(
  'MuiDateRangePickerDay',
  [
    'root',
    'rangeIntervalDayHighlight',
    'rangeIntervalDayHighlightStart',
    'rangeIntervalDayHighlightEnd',
    'rangeIntervalPreview',
    'rangeIntervalDayPreview',
    'rangeIntervalDayPreviewStart',
    'rangeIntervalDayPreviewEnd',
    'day',
    'dayOutsideRangeInterval',
    'dayInsideRangeInterval',
    'notSelectedDate',
  ],
);

type OwnerState = DateRangePickerDayProps<any> & { isEndOfMonth: boolean; isStartOfMonth: boolean };

const useUtilityClasses = (ownerState: OwnerState) => {
  const {
    isHighlighting,
    outsideCurrentMonth,
    isStartOfHighlighting,
    isStartOfMonth,
    isEndOfHighlighting,
    isEndOfMonth,
    isPreviewing,
    isStartOfPreviewing,
    isEndOfPreviewing,
    selected,
    classes,
  } = ownerState;

  const slots = {
    root: [
      'root',
      isHighlighting && !outsideCurrentMonth && 'rangeIntervalDayHighlight',
      (isStartOfHighlighting || isStartOfMonth) && 'rangeIntervalDayHighlightStart',
      (isEndOfHighlighting || isEndOfMonth) && 'rangeIntervalDayHighlightEnd',
    ],
    rangeIntervalPreview: [
      'rangeIntervalPreview',
      isPreviewing && !outsideCurrentMonth && 'rangeIntervalDayPreview',
      (isStartOfPreviewing || isStartOfMonth) && 'rangeIntervalDayPreviewStart',
      (isEndOfPreviewing || isEndOfMonth) && 'rangeIntervalDayPreviewEnd',
    ],
    day: [
      'day',
      !selected && 'notSelectedDate',
      !isHighlighting && 'dayOutsideRangeInterval',
      !selected && isHighlighting && 'dayInsideRangeInterval',
    ],
  };

  return composeClasses(slots, getDateRangePickerDayUtilityClass, classes);
};

const endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
};

const startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%',
};

const DateRangePickerDayRoot = styled('div', {
  name: 'MuiDateRangePickerDay',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
  [`&:first-of-type .${dateRangePickerDayClasses.rangeIntervalDayPreview}`]: {
    ...startBorderStyle,
    borderLeftColor: theme.palette.divider,
  },
  [`&:last-of-type .${dateRangePickerDayClasses.rangeIntervalDayPreview}`]: {
    ...endBorderStyle,
    borderRightColor: theme.palette.divider,
  },
  ...(ownerState.isHighlighting &&
    !ownerState.outsideCurrentMonth && {
      borderRadius: 0,
      color: theme.palette.primary.contrastText,
      backgroundColor: alpha(theme.palette.primary.light, 0.6),
      '&:first-of-type': startBorderStyle,
      '&:last-of-type': endBorderStyle,
    }),
  ...((ownerState.isStartOfHighlighting || ownerState.isStartOfMonth) && {
    ...startBorderStyle,
    paddingLeft: 0,
    marginLeft: DAY_MARGIN / 2,
  }),
  ...((ownerState.isEndOfHighlighting || ownerState.isEndOfMonth) && {
    ...endBorderStyle,
    paddingRight: 0,
    marginRight: DAY_MARGIN / 2,
  }),
}));

const DateRangePickerDayRangeIntervalPreview = styled('div', {
  name: 'MuiDateRangePickerDay',
  slot: 'RangeIntervalPreview',
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
  // replace default day component margin with transparent border to avoid jumping on preview
  border: '2px solid transparent',
  ...(ownerState.isPreviewing &&
    !ownerState.outsideCurrentMonth && {
      borderRadius: 0,
      border: `2px dashed ${theme.palette.divider}`,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      ...((ownerState.isStartOfPreviewing || ownerState.isStartOfMonth) && {
        borderLeftColor: theme.palette.divider,
        ...startBorderStyle,
      }),
      ...((ownerState.isEndOfPreviewing || ownerState.isEndOfMonth) && {
        borderRightColor: theme.palette.divider,
        ...endBorderStyle,
      }),
    }),
}));

const DateRangePickerDayDay = styled(PickersDay, { name: 'MuiDateRangePickerDay', slot: 'Day' })<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  // Required to overlap preview border
  transform: 'scale(1.1)',
  '& > *': {
    transform: 'scale(0.9)',
  },
  ...(!ownerState.selected && {
    backgroundColor: 'transparent',
  }),
  ...(!ownerState.isHighlighting && {
    '&:hover': {
      border: `1px solid ${theme.palette.grey[500]}`,
    },
  }),
  ...(!ownerState.selected &&
    ownerState.isHighlighting && {
      color: theme.palette.getContrastText(alpha(theme.palette.primary.light, 0.6)),
    }),
})) as unknown as <TDate>(
  props: PickersDayProps<TDate> & { ownerState: OwnerState },
) => JSX.Element;

const DateRangePickerDay = React.forwardRef(function DateRangePickerDay<TDate>(
  props: DateRangePickerDayProps<TDate>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    className,
    day,
    outsideCurrentMonth,
    isEndOfHighlighting,
    isEndOfPreviewing,
    isHighlighting,
    isPreviewing,
    isStartOfHighlighting,
    isStartOfPreviewing,
    selected = false,
    ...other
  } = props;
  const utils = useUtils<TDate>();

  const isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  const isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));

  const shouldRenderHighlight = isHighlighting && !outsideCurrentMonth;
  const shouldRenderPreview = isPreviewing && !outsideCurrentMonth;

  const ownerState = {
    ...props,
    selected,
    isStartOfMonth,
    isEndOfMonth,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <DateRangePickerDayRoot
      data-mui-test={shouldRenderHighlight ? 'DateRangeHighlight' : undefined}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
    >
      <DateRangePickerDayRangeIntervalPreview
        role="cell"
        data-mui-test={shouldRenderPreview ? 'DateRangePreview' : undefined}
        className={classes.rangeIntervalPreview}
        ownerState={ownerState}
      >
        <DateRangePickerDayDay<TDate>
          {...other}
          ref={ref}
          disableMargin
          allowSameDateSelection
          day={day}
          selected={selected}
          outsideCurrentMonth={outsideCurrentMonth}
          data-mui-test="DateRangePickerDay"
          className={classes.day}
          ownerState={ownerState}
        />
      </DateRangePickerDayRangeIntervalPreview>
    </DateRangePickerDayRoot>
  );
});

DateRangePickerDay.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,
  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isEndOfHighlighting: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isEndOfPreviewing: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is in a highlighted date range.
   */
  isHighlighting: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is in a preview date range.
   */
  isPreviewing: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isStartOfHighlighting: PropTypes.bool.isRequired,
  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isStartOfPreviewing: PropTypes.bool.isRequired,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
} as any;

/**
 *
 * Demos:
 *
 * - [Date Range Picker](https://material-ui.com/components/date-range-picker/)
 *
 * API:
 *
 * - [DateRangePickerDay API](https://material-ui.com/api/date-range-picker-day/)
 */
export default React.memo(DateRangePickerDay, (prevProps, nextProps) => {
  return (
    prevProps.isHighlighting === nextProps.isHighlighting &&
    prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting &&
    prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting &&
    prevProps.isPreviewing === nextProps.isPreviewing &&
    prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing &&
    prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing &&
    areDayPropsEqual(prevProps, nextProps)
  );
}) as <TDate>(
  props: DateRangePickerDayProps<TDate> & React.RefAttributes<HTMLButtonElement>,
) => JSX.Element;
