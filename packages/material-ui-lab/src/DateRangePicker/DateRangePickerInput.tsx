import * as React from 'react';
import { MuiStyles, StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { RangeInput, DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';
import { useMaskedInput } from '../internal/pickers/hooks/useMaskedInput';
import { DateRangeValidationError } from '../internal/pickers/date-utils';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { mergeRefs, executeInTheNextEventLoopTick } from '../internal/pickers/utils';
import { DateInputProps, MuiTextFieldProps } from '../internal/pickers/PureDateInput';

export type DateRangePickerInputClassKey = 'root' | 'toLabelDelimiter';

export const styles: MuiStyles<DateRangePickerInputClassKey> = (
  theme,
): StyleRules<DateRangePickerInputClassKey> => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  toLabelDelimiter: {
    margin: '8px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '0 16px',
    },
  },
});

export interface ExportedDateRangePickerInputProps {
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
    Omit<
      DateInputProps<RangeInput<any>, DateRange<any>>,
      'validationError' | 'renderInput' | 'forwardedRef'
    > {
  startText: React.ReactNode;
  endText: React.ReactNode;
  forwardedRef?: React.Ref<HTMLDivElement>;
  containerRef?: React.Ref<HTMLDivElement>;
  validationError: DateRangeValidationError;
}

/**
 * @ignore - internal component.
 */
const DateRangePickerInput: React.FC<DateRangeInputProps & WithStyles<typeof styles>> = ({
  classes,
  containerRef,
  currentlySelectingRangeEnd,
  disableOpenPicker,
  endText,
  forwardedRef,
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
}) => {
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
    if (!disableOpenPicker) {
      openPicker();
    }
  };

  const openRangeEndSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }
    if (!disableOpenPicker) {
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
    <div onBlur={onBlur} className={classes.root} ref={mergeRefs([containerRef, forwardedRef])}>
      {renderInput(startInputProps, endInputProps)}
    </div>
  );
};

export default withStyles(styles, { name: 'MuiPickersDateRangePickerInput' })(DateRangePickerInput);
