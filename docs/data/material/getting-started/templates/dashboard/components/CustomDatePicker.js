import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: 'fit-content' }}
    >
      {label ? `${label}` : 'Pick a date'}
    </Button>
  );
}

ButtonField.propTypes = {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputProps: PropTypes.shape({
    'aria-label': PropTypes.string,
  }),
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node,
  }),
  label: PropTypes.node,
  setOpen: PropTypes.func,
};

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{
        ...props.slotProps,
        field: { setOpen },
        nextIconButton: { size: 'small' },
        previousIconButton: { size: 'small' },
      }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      views={['day', 'month', 'year']}
    />
  );
}

ButtonDatePicker.propTypes = {
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.shape({
    actionBar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    calendarHeader: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        classes: PropTypes.object,
        className: PropTypes.string,
        currentMonth: PropTypes.shape({
          add: PropTypes.func.isRequired,
          clone: PropTypes.func.isRequired,
          date: PropTypes.func.isRequired,
          day: PropTypes.func.isRequired,
          daysInMonth: PropTypes.func.isRequired,
          diff: PropTypes.func.isRequired,
          endOf: PropTypes.func.isRequired,
          format: PropTypes.func.isRequired,
          get: PropTypes.func.isRequired,
          hour: PropTypes.func.isRequired,
          isAfter: PropTypes.func.isRequired,
          isBefore: PropTypes.func.isRequired,
          isSame: PropTypes.func.isRequired,
          isValid: PropTypes.func.isRequired,
          locale: PropTypes.func.isRequired,
          millisecond: PropTypes.func.isRequired,
          minute: PropTypes.func.isRequired,
          month: PropTypes.func.isRequired,
          second: PropTypes.func.isRequired,
          set: PropTypes.func.isRequired,
          startOf: PropTypes.func.isRequired,
          subtract: PropTypes.func.isRequired,
          toDate: PropTypes.func.isRequired,
          toISOString: PropTypes.func.isRequired,
          toJSON: PropTypes.func.isRequired,
          toString: PropTypes.func.isRequired,
          unix: PropTypes.func.isRequired,
          utcOffset: PropTypes.func.isRequired,
          valueOf: PropTypes.func.isRequired,
          year: PropTypes.func.isRequired,
        }),
        disabled: PropTypes.bool,
        disableFuture: PropTypes.bool,
        disablePast: PropTypes.bool,
        format: PropTypes.string,
        key: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.shape({
            '__@toStringTag@3182': PropTypes.oneOf(['BigInt']).isRequired,
            toLocaleString: PropTypes.func.isRequired,
            toString: PropTypes.func.isRequired,
            valueOf: PropTypes.func.isRequired,
          }),
          PropTypes.string,
        ]),
        labelId: PropTypes.string,
        maxDate: PropTypes.shape({
          add: PropTypes.func.isRequired,
          clone: PropTypes.func.isRequired,
          date: PropTypes.func.isRequired,
          day: PropTypes.func.isRequired,
          daysInMonth: PropTypes.func.isRequired,
          diff: PropTypes.func.isRequired,
          endOf: PropTypes.func.isRequired,
          format: PropTypes.func.isRequired,
          get: PropTypes.func.isRequired,
          hour: PropTypes.func.isRequired,
          isAfter: PropTypes.func.isRequired,
          isBefore: PropTypes.func.isRequired,
          isSame: PropTypes.func.isRequired,
          isValid: PropTypes.func.isRequired,
          locale: PropTypes.func.isRequired,
          millisecond: PropTypes.func.isRequired,
          minute: PropTypes.func.isRequired,
          month: PropTypes.func.isRequired,
          second: PropTypes.func.isRequired,
          set: PropTypes.func.isRequired,
          startOf: PropTypes.func.isRequired,
          subtract: PropTypes.func.isRequired,
          toDate: PropTypes.func.isRequired,
          toISOString: PropTypes.func.isRequired,
          toJSON: PropTypes.func.isRequired,
          toString: PropTypes.func.isRequired,
          unix: PropTypes.func.isRequired,
          utcOffset: PropTypes.func.isRequired,
          valueOf: PropTypes.func.isRequired,
          year: PropTypes.func.isRequired,
        }),
        minDate: PropTypes.shape({
          add: PropTypes.func.isRequired,
          clone: PropTypes.func.isRequired,
          date: PropTypes.func.isRequired,
          day: PropTypes.func.isRequired,
          daysInMonth: PropTypes.func.isRequired,
          diff: PropTypes.func.isRequired,
          endOf: PropTypes.func.isRequired,
          format: PropTypes.func.isRequired,
          get: PropTypes.func.isRequired,
          hour: PropTypes.func.isRequired,
          isAfter: PropTypes.func.isRequired,
          isBefore: PropTypes.func.isRequired,
          isSame: PropTypes.func.isRequired,
          isValid: PropTypes.func.isRequired,
          locale: PropTypes.func.isRequired,
          millisecond: PropTypes.func.isRequired,
          minute: PropTypes.func.isRequired,
          month: PropTypes.func.isRequired,
          second: PropTypes.func.isRequired,
          set: PropTypes.func.isRequired,
          startOf: PropTypes.func.isRequired,
          subtract: PropTypes.func.isRequired,
          toDate: PropTypes.func.isRequired,
          toISOString: PropTypes.func.isRequired,
          toJSON: PropTypes.func.isRequired,
          toString: PropTypes.func.isRequired,
          unix: PropTypes.func.isRequired,
          utcOffset: PropTypes.func.isRequired,
          valueOf: PropTypes.func.isRequired,
          year: PropTypes.func.isRequired,
        }),
        onMonthChange: PropTypes.func,
        onViewChange: PropTypes.func,
        reduceAnimations: PropTypes.bool,
        slotProps: PropTypes.shape({
          leftArrowIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          nextIconButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          previousIconButton: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object,
          ]),
          rightArrowIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          switchViewButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          switchViewIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        }),
        slots: PropTypes.shape({
          leftArrowIcon: PropTypes.elementType,
          nextIconButton: PropTypes.elementType,
          previousIconButton: PropTypes.elementType,
          rightArrowIcon: PropTypes.elementType,
          switchViewButton: PropTypes.elementType,
          switchViewIcon: PropTypes.elementType,
        }),
        sx: PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
          ),
          PropTypes.func,
          PropTypes.object,
        ]),
        timezone: PropTypes.string,
        view: PropTypes.oneOf(['day', 'month', 'year']),
        views: PropTypes.arrayOf(
          PropTypes.oneOf(['day', 'month', 'year']).isRequired,
        ),
      }),
    ]),
    clearButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    clearIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    day: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    desktopPaper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    desktopTransition: PropTypes.object,
    desktopTrapFocus: PropTypes.shape({
      children: PropTypes.element.isRequired,
      disableAutoFocus: PropTypes.bool,
      disableEnforceFocus: PropTypes.bool,
      disableRestoreFocus: PropTypes.bool,
      getTabbable: PropTypes.func,
      isEnabled: PropTypes.func,
      open: PropTypes.bool,
    }),
    dialog: PropTypes.object,
    field: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        clearable: PropTypes.bool,
        defaultValue: PropTypes.any,
        disabled: PropTypes.bool,
        enableAccessibleFieldDOMStructure: PropTypes.oneOf([false]),
        focused: PropTypes.bool,
        format: PropTypes.string,
        formatDensity: PropTypes.oneOf(['dense', 'spacious']),
        id: PropTypes.string,
        inputProps: PropTypes.shape({
          'aria-label': PropTypes.string,
        }),
        InputProps: PropTypes.shape({
          endAdornment: PropTypes.node,
          startAdornment: PropTypes.node,
        }),
        inputRef: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.shape({
            current: PropTypes.object,
          }),
        ]),
        label: PropTypes.node,
        name: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onClear: PropTypes.func,
        onError: PropTypes.func,
        onKeyDown: PropTypes.func,
        onSelectedSectionsChange: PropTypes.func,
        readOnly: PropTypes.bool,
        referenceDate: PropTypes.any,
        selectedSections: PropTypes.oneOfType([
          PropTypes.oneOf([
            'all',
            'day',
            'empty',
            'hours',
            'meridiem',
            'minutes',
            'month',
            'seconds',
            'weekDay',
            'year',
          ]),
          PropTypes.number,
        ]),
        shouldRespectLeadingZeros: PropTypes.bool,
        slotProps: PropTypes.shape({
          clearButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          clearIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          textField: PropTypes.object,
        }),
        slots: PropTypes.shape({
          clearButton: PropTypes.elementType,
          clearIcon: PropTypes.elementType,
        }),
        sx: PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
          ),
          PropTypes.func,
          PropTypes.object,
        ]),
        timezone: PropTypes.string,
        unstableFieldRef: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.shape({
            current: PropTypes.object,
          }),
        ]),
        value: PropTypes.any,
      }),
    ]),
    inputAdornment: PropTypes.object,
    layout: PropTypes.shape({
      children: PropTypes.node,
      classes: PropTypes.object,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      isLandscape: PropTypes.bool,
      isValid: PropTypes.func,
      onAccept: PropTypes.func,
      onCancel: PropTypes.func,
      onChange: PropTypes.func,
      onClear: PropTypes.func,
      onClose: PropTypes.func,
      onDismiss: PropTypes.func,
      onOpen: PropTypes.func,
      onSelectShortcut: PropTypes.func,
      onSetToday: PropTypes.func,
      onViewChange: PropTypes.func,
      orientation: PropTypes.oneOf(['landscape', 'portrait']),
      readOnly: PropTypes.bool,
      slotProps: PropTypes.shape({
        actionBar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        layout: PropTypes.object,
        shortcuts: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        tabs: PropTypes.object,
        toolbar: PropTypes.object,
      }),
      slots: PropTypes.shape({
        actionBar: PropTypes.elementType,
        layout: PropTypes.elementType,
        shortcuts: PropTypes.elementType,
        tabs: PropTypes.elementType,
        toolbar: PropTypes.elementType,
      }),
      sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
      ]),
      value: PropTypes.any,
      view: PropTypes.oneOf(['day', 'month', 'year']),
      views: PropTypes.arrayOf(PropTypes.oneOf(['day', 'month', 'year']).isRequired),
      wrapperVariant: PropTypes.oneOf(['desktop', 'mobile']),
    }),
    leftArrowIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mobilePaper: PropTypes.object,
    mobileTransition: PropTypes.object,
    nextIconButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    openPickerButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    openPickerIcon: PropTypes.object,
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    previousIconButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rightArrowIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    shortcuts: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    switchViewButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    switchViewIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    textField: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    toolbar: PropTypes.shape({
      classes: PropTypes.object,
      className: PropTypes.string,
      hidden: PropTypes.bool,
      sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
      ]),
      toolbarFormat: PropTypes.string,
      toolbarPlaceholder: PropTypes.node,
    }),
  }),
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.shape({
    actionBar: PropTypes.elementType,
    calendarHeader: PropTypes.elementType,
    clearButton: PropTypes.elementType,
    clearIcon: PropTypes.elementType,
    day: PropTypes.elementType,
    desktopPaper: PropTypes.elementType,
    desktopTransition: PropTypes.elementType,
    desktopTrapFocus: PropTypes.elementType,
    dialog: PropTypes.elementType,
    field: PropTypes.elementType,
    inputAdornment: PropTypes.elementType,
    layout: PropTypes.elementType,
    leftArrowIcon: PropTypes.elementType,
    mobilePaper: PropTypes.elementType,
    mobileTransition: PropTypes.elementType,
    nextIconButton: PropTypes.elementType,
    openPickerButton: PropTypes.elementType,
    openPickerIcon: PropTypes.elementType,
    popper: PropTypes.elementType,
    previousIconButton: PropTypes.elementType,
    rightArrowIcon: PropTypes.elementType,
    shortcuts: PropTypes.elementType,
    switchViewButton: PropTypes.elementType,
    switchViewIcon: PropTypes.elementType,
    textField: PropTypes.elementType,
    toolbar: PropTypes.elementType,
  }),
};

export default function CustomDatePicker() {
  const [value, setValue] = React.useState(dayjs('2023-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        label={value == null ? null : value.format('MMM DD, YYYY')}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}
