import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { RangeInput, DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
import { useMaskedInput } from '../internal/pickers/hooks/useMaskedInput';
import { DateRangeValidationError } from '../internal/pickers/date-utils';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { executeInTheNextEventLoopTick } from '../internal/pickers/utils';
import {
  DateInputProps,
  ExportedDateInputProps,
  MuiTextFieldProps,
} from '../internal/pickers/PureDateInput';

const DateRangePickerInputRoot = styled('div', { skipSx: true })(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export interface ExportedDateRangePickerInputProps
  extends Omit<ExportedDateInputProps<RangeInput<any>, DateRange<any>>, 'renderInput'> {
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `startProps` and `endProps` arguments of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api),
   * that you need to forward to the range start/end inputs respectively.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example
   * ```jsx
   * <DateRangePicker
   *  renderInput={(startProps, endProps) => (
   *   <React.Fragment>
   *     <TextField {...startProps} />
   *     <Box sx={{ mx: 2 }}> to </Box>
   *     <TextField {...endProps} />
   *   </React.Fragment>;
   *  )}
   * />
   * ````
   */
  renderInput: (startProps: MuiTextFieldProps, endProps: MuiTextFieldProps) => React.ReactElement;
}

export interface DateRangeInputProps
  extends ExportedDateRangePickerInputProps,
    CurrentlySelectingRangeEndProps,
    Omit<DateInputProps<RangeInput<any>, DateRange<any>>, 'validationError' | 'renderInput'> {
  startText: React.ReactNode;
  endText: React.ReactNode;
  validationError: DateRangeValidationError;
}

/**
 * @ignore - internal component.
 */
const DateRangePickerInput = React.forwardRef(function DateRangePickerInput(
  props: DateRangeInputProps,
  ref: React.Ref<HTMLDivElement>,
): JSX.Element {
  const {
    currentlySelectingRangeEnd,
    disableOpenPicker,
    endText,
    onBlur,
    onChange,
    open,
    openPicker,
    rawValue,
    rawValue: [start, end],
    readOnly,
    renderInput,
    setCurrentlySelectingRangeEnd,
    startText,
    TextFieldProps,
    validationError: [startValidationError, endValidationError],
    ...other
  } = props;

  const utils = useUtils();
  const startRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLInputElement>(null);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    if (currentlySelectingRangeEnd === 'start') {
      startRef.current?.focus();
    } else if (currentlySelectingRangeEnd === 'end') {
      endRef.current?.focus();
    }
  }, [currentlySelectingRangeEnd, open]);

  // TODO: rethink this approach. We do not need to wait for calendar to be updated to rerender input (looks like freezing)
  // TODO: so simply break 1 react's commit phase in 2 (first for input and second for calendars) by executing onChange in the next tick
  const lazyHandleChangeCallback = React.useCallback(
    (...args: Parameters<typeof onChange>) =>
      executeInTheNextEventLoopTick(() => onChange(...args)),
    [onChange],
  );

  const handleStartChange = (date: unknown, inputString?: string) => {
    lazyHandleChangeCallback([date, utils.date(end)], inputString);
  };

  const handleEndChange = (date: unknown, inputString?: string) => {
    lazyHandleChangeCallback([utils.date(start), date], inputString);
  };

  const openRangeStartSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
    }
    if (!readOnly && !disableOpenPicker) {
      openPicker();
    }
  };

  const openRangeEndSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }
    if (!readOnly && !disableOpenPicker) {
      openPicker();
    }
  };

  const openOnFocus = wrapperVariant === 'desktop';
  const startInputProps = useMaskedInput({
    ...other,
    readOnly,
    rawValue: start,
    onChange: handleStartChange,
    label: startText,
    validationError: startValidationError !== null,
    TextFieldProps: {
      ...TextFieldProps,
      ref: startRef,
      focused: open && currentlySelectingRangeEnd === 'start',
    },
    inputProps: {
      onClick: !openOnFocus ? openRangeStartSelection : undefined,
      onFocus: openOnFocus ? openRangeStartSelection : undefined,
    },
  });

  const endInputProps = useMaskedInput({
    ...other,
    readOnly,
    label: endText,
    rawValue: end,
    onChange: handleEndChange,
    validationError: endValidationError !== null,
    TextFieldProps: {
      ...TextFieldProps,
      ref: endRef,
      focused: open && currentlySelectingRangeEnd === 'end',
    },
    inputProps: {
      onClick: !openOnFocus ? openRangeEndSelection : undefined,
      onFocus: openOnFocus ? openRangeEndSelection : undefined,
    },
  });

  return (
    <DateRangePickerInputRoot onBlur={onBlur} ref={ref}>
      {renderInput(startInputProps, endInputProps)}
    </DateRangePickerInputRoot>
  );
});

export default DateRangePickerInput;
