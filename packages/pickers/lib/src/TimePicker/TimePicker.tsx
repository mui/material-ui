import React from 'react';
import { ClockIcon } from '../_shared/icons/Clock';
import { ParsableDate } from '../constants/prop-types';
import { TimePickerToolbar } from './TimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useParsedDate, OverrideParsableDateProps } from '../_shared/hooks/date-helpers-hooks';
import { useUtils, MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { validateTime, TimeValidationError } from '../_helpers/time-utils';
import { WithViewsProps, AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { ValidationProps, makeValidationHook } from '../_shared/hooks/useValidation';
import { MobileWrapper, DesktopWrapper, StaticWrapper, SomeWrapper } from '../wrappers/Wrapper';
import { SharedPickerProps, makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';

export interface BaseTimePickerProps<TDate = unknown>
  extends ValidationProps<TimeValidationError, ParsableDate<TDate>>,
    WithViewsProps<'hours' | 'minutes' | 'seconds'>,
    OverrideParsableDateProps<TDate, ExportedClockViewProps<TDate>, 'minTime' | 'maxTime'> {}

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

const timePickerConfig = {
  useInterceptProps,
  useValidation: makeValidationHook<
    TimeValidationError,
    ParsableDate,
    BaseTimePickerProps<unknown>
  >(validateTime),
  DefaultToolbarComponent: TimePickerToolbar,
};

type TimePickerComponent<TWrapper extends SomeWrapper> = <TDate>(
  props: BaseTimePickerProps<TDate> & SharedPickerProps<TDate, TWrapper>
) => JSX.Element;

export const TimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(ResponsiveWrapper, {
  name: 'MuiTimePicker',
  ...timePickerConfig,
}) as TimePickerComponent<typeof ResponsiveWrapper>;

export type TimePickerProps = React.ComponentProps<typeof TimePicker>;

export const DesktopTimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(
  DesktopWrapper,
  {
    name: 'MuiDesktopTimePicker',
    ...timePickerConfig,
  }
) as TimePickerComponent<typeof DesktopWrapper>;

export type DesktopTimePickerProps = React.ComponentProps<typeof DesktopTimePicker>;

export const MobileTimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(MobileWrapper, {
  name: 'MuiMobileTimePicker',
  ...timePickerConfig,
}) as TimePickerComponent<typeof MobileWrapper>;

export type MobileTimePickerProps = React.ComponentProps<typeof MobileTimePicker>;

export const StaticTimePicker = makePickerWithStateAndWrapper<BaseTimePickerProps>(StaticWrapper, {
  name: 'MuiStaticTimePicker',
  ...timePickerConfig,
});

export type StaticTimePickerProps = React.ComponentProps<typeof StaticTimePicker>;
