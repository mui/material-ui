import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import { RangeInput, DateRange } from './RangeTypes';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '../typings/date';
import { DateInputProps } from '../_shared/PureDateInput';
import { CurrentlySelectingRangeEndProps } from './RangeTypes';
import { mergeRefs, doNothing, executeInTheNextEventLoopTick } from '../_helpers/utils';

export const useStyles = makeStyles(
  theme => ({
    rangeInputsContainer: {
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
  }),
  { name: 'MuiPickersDateRangePickerInput' }
);

export interface ExportedDateRangePickerInputProps {
  toText?: React.ReactNode;
}

export interface DateRangeInputProps
  extends ExportedDateRangePickerInputProps,
    CurrentlySelectingRangeEndProps,
    Omit<DateInputProps<RangeInput, DateRange>, 'forwardedRef'> {
  startText: React.ReactNode;
  endText: React.ReactNode;
  forwardedRef?: React.Ref<HTMLDivElement>;
  containerRef?: React.Ref<HTMLDivElement>;
}

export const DateRangePickerInput: React.FC<DateRangeInputProps> = ({
  toText = 'to',
  rawValue,
  onChange,
  parsedDateValue: [start, end],
  open,
  containerRef,
  forwardedRef,
  currentlySelectingRangeEnd,
  setCurrentlySelectingRangeEnd,
  openPicker,
  readOnly,
  disableOpenPicker,
  startText,
  endText,
  ...other
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const startRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLInputElement>(null);

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
    [onChange]
  );

  const handleStartChange = (date: MaterialUiPickersDate, inputString?: string) => {
    if (date === null || utils.isValid(date)) {
      lazyHandleChangeCallback([date, end], inputString);
    }
  };

  const handleEndChange = (date: MaterialUiPickersDate, inputString?: string) => {
    if (date === null || utils.isValid(date)) {
      lazyHandleChangeCallback([start, date], inputString);
    }
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

  return (
    <div className={classes.rangeInputsContainer} ref={mergeRefs([containerRef, forwardedRef])}>
      <KeyboardDateInput
        {...other}
        open={open}
        forwardedRef={startRef}
        rawValue={start}
        parsedDateValue={start}
        onChange={handleStartChange}
        disableOpenPicker
        openPicker={doNothing}
        readOnly={readOnly}
        label={startText}
        TextFieldProps={{
          variant: 'outlined',
          focused: open && currentlySelectingRangeEnd === 'start',
          onClick: readOnly ? openRangeStartSelection : undefined,
          onFocus: !readOnly ? openRangeStartSelection : undefined,
        }}
      />

      <Typography className={classes.toLabelDelimiter}>{toText}</Typography>

      <KeyboardDateInput
        {...other}
        open={open}
        forwardedRef={endRef}
        rawValue={end}
        parsedDateValue={end}
        onChange={handleEndChange}
        disableOpenPicker
        openPicker={doNothing}
        readOnly={readOnly}
        label={endText}
        TextFieldProps={{
          variant: 'outlined',
          focused: open && currentlySelectingRangeEnd === 'end',
          onClick: readOnly ? openRangeEndSelection : undefined,
          onFocus: !readOnly ? openRangeEndSelection : undefined,
        }}
      />
    </div>
  );
};
