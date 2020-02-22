import * as React from 'react';
import ClockNumber from './ClockNumber';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../../typings/date';

export const getHourNumbers = ({
  ampm,
  date,
  utils,
  onChange,
  isDisabled,
  getClockNumberText,
}: {
  ampm: boolean;
  utils: IUtils<MaterialUiPickersDate>;
  date: MaterialUiPickersDate;
  onChange: (value: number, isFinish?: boolean) => void;
  getClockNumberText: (hour: string) => string;
  isDisabled: (value: number) => boolean;
}) => {
  const currentHours = utils.getHours(date);

  const hourNumbers: JSX.Element[] = [];
  const startHour = ampm ? 1 : 0;
  const endHour = ampm ? 12 : 23;

  const isSelected = (hour: number) => {
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
        onSelect={() => onChange(hour, true)}
        getClockNumberText={getClockNumberText}
      />
    );
  }

  return hourNumbers;
};

export const getMinutesNumbers = ({
  value,
  utils,
  onChange,
  isDisabled,
  getClockNumberText,
}: {
  value: number;
  utils: IUtils<MaterialUiPickersDate>;
  onChange: (value: number, isFinish?: boolean | symbol) => void;
  getClockNumberText: (hour: string) => string;
  isDisabled: (value: number) => boolean;
}) => {
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
      onSelect={isFinish => onChange(numberValue, isFinish)}
      getClockNumberText={getClockNumberText}
    />
  ));
};
