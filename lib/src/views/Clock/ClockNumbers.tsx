import * as React from 'react';
import ClockNumber from './ClockNumber';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../../typings/date';

export const getHourNumbers = ({
  ampm,
  utils,
  onChange,
  date,
  getClockNumberText,
}: {
  ampm: boolean;
  utils: IUtils<MaterialUiPickersDate>;
  date: MaterialUiPickersDate;
  onChange: (value: number, isFinish?: boolean) => void;
  getClockNumberText: (hour: string) => string;
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

    const props = {
      index: hour,
      onSelect: () => onChange(hour, true),
      label: utils.formatNumber(label),
      selected: isSelected(hour),
      isInner: !ampm && (hour === 0 || hour > 12),
    };

    hourNumbers.push(
      <ClockNumber
        key={hour}
        getClockNumberText={getClockNumberText}
        onSelect={onChange}
        {...props}
      />
    );
  }

  return hourNumbers;
};

export const getMinutesNumbers = ({
  value,
  utils,
  onChange,
  getClockNumberText,
}: {
  value: number;
  utils: IUtils<MaterialUiPickersDate>;
  onChange: (value: number, isFinish?: boolean | symbol) => void;
  getClockNumberText: (hour: string) => string;
}) => {
  const f = utils.formatNumber;

  return [
    <ClockNumber
      label={f('00')}
      index={12}
      onSelect={isFinish => onChange(0, isFinish)}
      selected={value === 0}
      key={12}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('05')}
      index={1}
      onSelect={isFinish => onChange(5, isFinish)}
      selected={value === 5}
      key={1}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('10')}
      index={2}
      onSelect={isFinish => onChange(10, isFinish)}
      selected={value === 10}
      key={2}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('15')}
      index={3}
      onSelect={isFinish => onChange(15, isFinish)}
      selected={value === 15}
      key={3}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('20')}
      index={4}
      onSelect={isFinish => onChange(20, isFinish)}
      selected={value === 20}
      key={4}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('25')}
      index={5}
      onSelect={isFinish => onChange(25, isFinish)}
      selected={value === 25}
      key={5}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('30')}
      index={6}
      onSelect={isFinish => onChange(30, isFinish)}
      selected={value === 30}
      key={6}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('35')}
      index={7}
      onSelect={isFinish => onChange(35, isFinish)}
      selected={value === 35}
      key={7}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('40')}
      index={8}
      onSelect={isFinish => onChange(40, isFinish)}
      selected={value === 40}
      key={8}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('45')}
      index={9}
      onSelect={isFinish => onChange(45, isFinish)}
      selected={value === 45}
      key={9}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('50')}
      index={10}
      onSelect={isFinish => onChange(50, isFinish)}
      selected={value === 50}
      key={10}
      getClockNumberText={getClockNumberText}
    />,
    <ClockNumber
      label={f('55')}
      index={11}
      onSelect={isFinish => onChange(55, isFinish)}
      selected={value === 55}
      key={11}
      getClockNumberText={getClockNumberText}
    />,
  ];
};
