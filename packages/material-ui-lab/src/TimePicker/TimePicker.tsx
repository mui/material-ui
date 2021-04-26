import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import ClockIcon from '../internal/svg-icons/Clock';
import { ParsableDate } from '../internal/pickers/constants/prop-types';
import TimePickerToolbar from './TimePickerToolbar';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import {
  ResponsiveWrapper,
  ResponsiveWrapperProps,
} from '../internal/pickers/wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
import { useUtils, MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { validateTime, TimeValidationError } from '../internal/pickers/time-utils';
import { AllSharedPickerProps } from '../internal/pickers/Picker/SharedPickerProps';
import { ValidationProps, makeValidationHook } from '../internal/pickers/hooks/useValidation';
import {
  useParsedDate,
  OverrideParsableDateProps,
} from '../internal/pickers/hooks/date-helpers-hooks';
import Picker from '../internal/pickers/Picker/Picker';
import { parsePickerInputValue } from '../internal/pickers/date-utils';
import { KeyboardDateInput } from '../internal/pickers/KeyboardDateInput';
import { PureDateInput } from '../internal/pickers/PureDateInput';
import { usePickerState, PickerStateValueManager } from '../internal/pickers/hooks/usePickerState';

const valueManager: PickerStateValueManager<unknown, unknown> = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils: MuiPickersAdapter, a: unknown, b: unknown) => utils.isEqual(a, b),
};

export type TimePickerView = 'hours' | 'minutes' | 'seconds';

export interface BaseTimePickerProps<TDate = unknown>
  extends ValidationProps<TimeValidationError, ParsableDate<TDate>>,
    OverrideParsableDateProps<TDate, ExportedClockPickerProps<TDate>, 'minTime' | 'maxTime'>,
    AllSharedPickerProps<ParsableDate<TDate>, TDate | null> {
  /**
   * First view to show.
   */
  openTo?: TimePickerView;
  /**
   * Array of views to show.
   */
  views?: readonly TimePickerView[];
}

export function getTextFieldAriaText(value: ParsableDate, utils: MuiPickersAdapter) {
  return value && utils.isValid(utils.date(value))
    ? `Choose time, selected time is ${utils.format(utils.date(value), 'fullTime')}`
    : 'Choose time';
}

function useInterceptProps({
  ampm,
  inputFormat,
  maxTime: __maxTime,
  minTime: __minTime,
  openTo = 'hours',
  views = ['hours', 'minutes'],
  ...other
}: BaseTimePickerProps & AllSharedPickerProps) {
  const utils = useUtils();

  const minTime = useParsedDate(__minTime);
  const maxTime = useParsedDate(__maxTime);
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  return {
    views,
    openTo,
    minTime,
    maxTime,
    ampm: willUseAmPm,
    acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
    mask: '__:__',
    disableMaskedInput: willUseAmPm,
    getOpenDialogAriaText: getTextFieldAriaText,
    openPickerIcon: <ClockIcon />,
    inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
      localized: utils.formats.fullTime,
      '12h': utils.formats.fullTime12h,
      '24h': utils.formats.fullTime24h,
    }),
    ...other,
  };
}

export const timePickerConfig = {
  useInterceptProps,
  useValidation: makeValidationHook<TimeValidationError, ParsableDate, BaseTimePickerProps>(
    validateTime,
  ),
  DefaultToolbarComponent: TimePickerToolbar,
};

const { DefaultToolbarComponent, useValidation } = timePickerConfig;

export interface TimePickerProps<TDate = unknown>
  extends BaseTimePickerProps<TDate>,
    ResponsiveWrapperProps {}

type TimePickerComponent = (<TDate>(
  props: TimePickerProps<TDate> & React.RefAttributes<HTMLInputElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Time Picker](https://material-ui.com/components/time-picker/)
 *
 * API:
 *
 * - [TimePicker API](https://material-ui.com/api/time-picker/)
 */
const TimePicker = React.forwardRef(function TimePicker<TDate>(
  inProps: TimePickerProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  // TODO: TDate needs to be instantiated at every usage.
  const allProps: TimePickerProps<unknown> = useInterceptProps(inProps as TimePickerProps<unknown>);

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const props = useThemeProps({
    props: allProps,
    name: 'MuiTimePicker',
  }) as TimePickerProps<unknown>;

  const validationError = useValidation(props.value, props as TimePickerProps<unknown>) !== null;
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, valueManager);

  // Note that we are passing down all the value without spread.
  // It saves us >1kb gzip and make any prop available automatically on any level down.
  const { value, onChange, ...other } = props;
  const AllDateInputProps = { ...inputProps, ...other, ref, validationError };

  return (
    <ResponsiveWrapper
      {...other}
      {...wrapperProps}
      DateInputProps={AllDateInputProps}
      KeyboardDateInputComponent={KeyboardDateInput}
      PureDateInputComponent={PureDateInput}
    >
      <Picker
        {...pickerProps}
        toolbarTitle={props.label || props.toolbarTitle}
        ToolbarComponent={other.ToolbarComponent || DefaultToolbarComponent}
        DateInputProps={AllDateInputProps}
        {...other}
      />
    </ResponsiveWrapper>
  );
}) as TimePickerComponent;

TimePicker.propTypes /* remove-proptypes */ = {
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
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: PropTypes.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,
  /**
   * Cancel text message.
   * @default "CANCEL"
   */
  cancelText: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
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
   * Clear text message.
   * @default "CLEAR"
   */
  clearText: PropTypes.node,
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
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: ClockView,
   *   time: TDate,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) => `Select ${view}. Selected time is ${adapter.format(time, 'fullTime')}`
   */
  getClockLabelText: PropTypes.func,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
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
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  label: PropTypes.node,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
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
   * Callback fired when the value (the selected date) changes @DateIOType.
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
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
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
  openTo: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
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
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,
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
   * Today text message.
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
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired),
} as any;

export default TimePicker;
