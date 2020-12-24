import * as React from 'react';
import PropTypes from 'prop-types';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import DateTimePickerToolbar from './DateTimePickerToolbar';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { ResponsiveWrapper } from '../internal/pickers/wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
import {
  useParsedDate,
  OverrideParsableDateProps,
} from '../internal/pickers/hooks/date-helpers-hooks';
import { ExportedDayPickerProps } from '../DayPicker/DayPicker';
import {
  makePickerWithStateAndWrapper,
  SharedPickerProps,
} from '../internal/pickers/Picker/makePickerWithState';
import { SomeWrapper } from '../internal/pickers/wrappers/Wrapper';
import { WithViewsProps, AllSharedPickerProps } from '../internal/pickers/Picker/SharedPickerProps';
import { DateAndTimeValidationError, validateDateAndTime } from './date-time-utils';
import { makeValidationHook, ValidationProps } from '../internal/pickers/hooks/useValidation';
import {
  ParsableDate,
  defaultMinDate,
  defaultMaxDate,
} from '../internal/pickers/constants/prop-types';

type DateTimePickerViewsProps<TDate> = OverrideParsableDateProps<
  TDate,
  ExportedClockPickerProps<TDate> & ExportedDayPickerProps<TDate>,
  'minDate' | 'maxDate' | 'minTime' | 'maxTime'
>;

export interface BaseDateTimePickerProps<TDate>
  extends WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes'>,
    ValidationProps<DateAndTimeValidationError, ParsableDate>,
    DateTimePickerViewsProps<TDate> {
  /**
   * To show tabs.
   */
  hideTabs?: boolean;
  /**
   * Date tab icon.
   */
  dateRangeIcon?: React.ReactNode;
  /**
   * Time tab icon.
   */
  timeIcon?: React.ReactNode;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime?: ParsableDate<TDate>;
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: ParsableDate<TDate>;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
}

function useInterceptProps({
  ampm,
  inputFormat,
  maxDate: __maxDate = defaultMaxDate,
  maxDateTime: __maxDateTime,
  maxTime: __maxTime,
  minDate: __minDate = defaultMinDate,
  minDateTime: __minDateTime,
  minTime: __minTime,
  openTo = 'date',
  orientation = 'portrait',
  views = ['year', 'date', 'hours', 'minutes'],
  ...other
}: BaseDateTimePickerProps<unknown> & AllSharedPickerProps) {
  const utils = useUtils();
  const minTime = useParsedDate(__minTime);
  const maxTime = useParsedDate(__maxTime);
  const minDate = useParsedDate(__minDate);
  const maxDate = useParsedDate(__maxDate);
  const minDateTime = useParsedDate(__minDateTime);
  const maxDateTime = useParsedDate(__maxDateTime);
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    openTo,
    views,
    ampm: willUseAmPm,
    ampmInClock: true,
    orientation,
    showToolbar: true,
    showTabs: true,
    allowSameDateSelection: true,
    minDate: minDateTime || minDate,
    minTime: minDateTime || minTime,
    maxDate: maxDateTime || maxDate,
    maxTime: maxDateTime || maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: '__/__/____ __:__',
    disableMaskedInput: willUseAmPm,
    inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
      localized: utils.formats.keyboardDateTime,
      '12h': utils.formats.keyboardDateTime12h,
      '24h': utils.formats.keyboardDateTime24h,
    }),
    ...other,
  };
}

const useValidation = makeValidationHook<
  DateAndTimeValidationError,
  ParsableDate,
  BaseDateTimePickerProps<unknown>
>(validateDateAndTime);

export const dateTimePickerConfig = {
  useInterceptProps,
  useValidation,
  DefaultToolbarComponent: DateTimePickerToolbar,
};

export type DateTimePickerGenericComponent<TWrapper extends SomeWrapper> = <TDate>(
  props: BaseDateTimePickerProps<TDate> & SharedPickerProps<TDate, TWrapper>,
) => JSX.Element;

/**
 * @ignore - do not document.
 */
/* @typescript-to-proptypes-generate */
const DateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps<unknown>>(
  ResponsiveWrapper,
  {
    name: 'MuiDateTimePicker',
    ...dateTimePickerConfig,
  },
) as DateTimePickerGenericComponent<typeof ResponsiveWrapper>;

(DateTimePicker as any).propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),
  /**
   * Enables keyboard listener for moving between days in calendar.
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,
  /**
   * 12h/24h view for hour selection clock.
   * @default true
   */
  ampm: PropTypes.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,
  /**
   * Cancel text message
   * @default "CANCEL"
   */
  cancelText: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable: PropTypes.bool,
  /**
   * Clear text message
   * @default "CLEAR"
   */
  clearText: PropTypes.node,
  /**
   * Allows to pass configured date-io adapter directly. More info [here](https://next.material-ui-pickers.dev/guides/date-adapter-passing)
   * ```jsx
   * dateAdapter={new AdapterDateFns({ locale: ruLocale })}
   * ```
   */
  dateAdapter: PropTypes.object,
  /**
   * Date tab icon.
   */
  dateRangeIcon: PropTypes.node,
  /**
   * Default calendar month displayed when `value={null}`.
   * @default `new Date()`
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default "@media (pointer: fine)"
   * @example "@media (min-width: 720px)" or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery: PropTypes.string,
  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps: PropTypes.object,
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Disable future dates.
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,
  /**
   * Disable past dates.
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @default (view, time) => `Select ${view}. Selected time is ${format(time, 'fullTime')}`
   */
  getClockLabelText: PropTypes.func,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText: PropTypes.func,
  /**
   * To show tabs.
   */
  hideTabs: PropTypes.bool,
  /**
   * @ignore
   */
  ignoreInvalidInputs: PropTypes.bool,
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,
  /**
   * Format string.
   */
  inputFormat: PropTypes.string,
  /**
   * @ignore
   */
  InputProps: PropTypes.object,
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  label: PropTypes.node,
  /**
   * Props to pass to left arrow button.
   */
  leftArrowButtonProps: PropTypes.object,
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText: PropTypes.string,
  /**
   * Left arrow icon.
   */
  leftArrowIcon: PropTypes.node,
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__ or __/__/____ __:__ _M)
   */
  mask: PropTypes.string,
  /**
   * @ignore
   */
  maxDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  maxTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
  /**
   * Ok button text.
   * @default "OK"
   */
  okText: PropTypes.node,
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: PropTypes.func,
  /**
   * Callback fired when the value (the selected date) changes. @DateIOType.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError: PropTypes.func,
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange: PropTypes.func,
  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,
  /**
   * Icon displaying for open picker button.
   */
  openPickerIcon: PropTypes.node,
  /**
   * First view to show.
   */
  openTo: PropTypes.oneOf(['date', 'hours', 'minutes', 'month', 'seconds', 'year']),
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  /**
   * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
   */
  PopperProps: PropTypes.object,
  /**
   * Make picker read only.
   */
  readOnly: PropTypes.bool,
  /**
   * Disable heavy animations.
   * @default /(android)/i.test(window.navigator.userAgent).
   */
  reduceAnimations: PropTypes.bool,
  /**
   * Custom renderer for day. Check [DayComponentProps api](https://material-ui-pickers.dev/api/Day) @DateIOType.
   */
  renderDay: PropTypes.func,
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Component displaying when passed `loading` true.
   * @default () => "..."
   */
  renderLoading: PropTypes.func,
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Props to pass to right arrow button.
   */
  rightArrowButtonProps: PropTypes.object,
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText: PropTypes.string,
  /**
   * Right arrow icon.
   */
  rightArrowIcon: PropTypes.node,
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view. @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton: PropTypes.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
  /**
   * Time tab icon.
   */
  timeIcon: PropTypes.node,
  /**
   * Today text message
   * @default "TODAY"
   */
  todayText: PropTypes.node,
  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent: PropTypes.elementType,
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: PropTypes.string,
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default "–"
   */
  toolbarPlaceholder: PropTypes.node,
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default "SELECT DATE"
   */
  toolbarTitle: PropTypes.node,
  /**
   * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The value of the picker.
   */
  value: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Array of views to show.
   */
  views: PropTypes.arrayOf(
    PropTypes.oneOf(['date', 'hours', 'minutes', 'month', 'year']).isRequired,
  ),
};

export type DateTimePickerProps = React.ComponentProps<typeof DateTimePicker>;

export default DateTimePicker;
