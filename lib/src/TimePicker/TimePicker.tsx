import React from 'react';
import ClockIcon from '../_shared/icons/ClockIcon';
import { ParsableDate } from '../constants/prop-types';
import { TimePickerToolbar } from './TimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { useUtils, MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { validateTime, TimeValidationError } from '../_helpers/time-utils';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { MobileWrapper, DesktopWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { WithViewsProps, AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { ValidationProps, makeValidationHook } from '../_shared/hooks/useValidation';

export interface BaseTimePickerProps
  extends ExportedClockViewProps,
    ValidationProps<TimeValidationError, ParsableDate>,
    WithViewsProps<'hours' | 'minutes' | 'seconds'> {}

export function getTextFieldAriaText(value: ParsableDate, utils: MuiPickersAdapter) {
  return value && utils.isValid(utils.date(value))
    ? `Choose time, selected time is ${utils.format(utils.date(value), 'fullTime')}`
    : 'Choose time';
}

function useInterceptProps({
  ampm,
  inputFormat,
  mask,
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
    mask: mask || (willUseAmPm ? '__:__ _M' : '__:__'),
    getOpenDialogAriaText: getTextFieldAriaText,
    openPickerIcon: <ClockIcon />,
    inputFormat: pick12hOr24hFormat(inputFormat, ampm, {
      localized: utils.formats.fullTime,
      '12h': utils.formats.fullTime12h,
      '24h': utils.formats.fullTime24h,
    }),
    ...other,
  };
}

const timePickerConfig = {
  useInterceptProps,
  useValidation: makeValidationHook<TimeValidationError, ParsableDate, BaseTimePickerProps>(
    validateTime
  ),
  DefaultToolbarComponent: TimePickerToolbar,
};

export const TimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(ResponsiveWrapper, {
  name: 'MuiPickersTimePicker',
  ...timePickerConfig,
});

export type TimePickerProps = React.ComponentProps<typeof TimePicker>;

export const DesktopTimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(
  DesktopWrapper,
  {
    name: 'MuiPickersDesktopTimePicker',
    ...timePickerConfig,
  }
);

export type DesktopTimePickerProps = React.ComponentProps<typeof DesktopTimePicker>;

export const MobileTimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(MobileWrapper, {
  name: 'MuiPickersMobileTimePicker',
  ...timePickerConfig,
});

export type MobileTimePickerProps = React.ComponentProps<typeof MobileTimePicker>;

export const StaticTimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(StaticWrapper, {
  name: 'MuiPickersStaticTimePicker',
  ...timePickerConfig,
});

export type StaticTimePickerProps = React.ComponentProps<typeof StaticTimePicker>;
