import * as React from 'react';
import { ClockNumber } from './ClockNumber';
import { MuiPickersAdapter } from '../../_shared/hooks/useUtils';
import { PickerSelectionState } from '../../_shared/hooks/usePickerState';

interface GetHourNumbersOptions {
  ampm: boolean;
  date: unknown;
  getClockNumberText: (hour: string) => string;
  isDisabled: (value: number) => boolean;
  onChange: (value: number, isFinish?: PickerSelectionState) => void;
  utils: MuiPickersAdapter;
}

export const getHourNumbers = ({
  ampm,
  date,
  getClockNumberText,
  isDisabled,
  onChange,
  utils,
}: GetHourNumbersOptions) => {
  const currentHours = date ? utils.getHours(date) : null;

  const hourNumbers: JSX.Element[] = [];
  const startHour = ampm ? 1 : 0;
  const endHour = ampm ? 12 : 23;

  const isSelected = (hour: number) => {
    if (currentHours === null) {
      return false;
    }

    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  for (let hour = startHour; hour <= endHour; hour += 1) {
    let label = hour.toString();

    if (hour === 0) {
      label = '00';
    }

    const isInner = !ampm && (hour === 0 || hour > 12);
    hourNumbers.push(
      <ClockNumber
        key={hour}
        index={hour}
        isInner={isInner}
        selected={isSelected(hour)}
        disabled={isDisabled(hour)}
        label={utils.formatNumber(label)}
        onSelect={() => onChange(hour, 'finish')}
        getClockNumberText={getClockNumberText}
      />
    );
  }

  return hourNumbers;
};

export const getMinutesNumbers = ({
  utils,
  value,
  onChange,
  isDisabled,
  getClockNumberText,
}: Omit<GetHourNumbersOptions, 'ampm' | 'date'> & { value: number }) => {
  const f = utils.formatNumber;

  return ([
    [5, f('05')],
    [10, f('10')],
    [15, f('15')],
    [20, f('20')],
    [25, f('25')],
    [30, f('30')],
    [35, f('35')],
    [40, f('40')],
    [45, f('45')],
    [50, f('50')],
    [55, f('55')],
    [0, f('00')],
  ] as const).map(([numberValue, label], index) => (
    <ClockNumber
      key={numberValue}
      label={label}
      index={index + 1}
      disabled={isDisabled(numberValue)}
      selected={numberValue === value}
      onSelect={(isFinish) => onChange(numberValue, isFinish)}
      getClockNumberText={getClockNumberText}
    />
  ));
};
