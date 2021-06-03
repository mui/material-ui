import * as React from 'react';
import ClockNumber from './ClockNumber';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';

interface GetHourNumbersOptions {
  ampm: boolean;
  date: unknown;
  getClockNumberText: (hour: string) => string;
  isDisabled: (value: number) => boolean;
  onChange: (value: number, isFinish?: PickerSelectionState) => void;
  /**
   * DOM id that the selected option should have
   * Should only be `undefined` on the server
   */
  selectedId: string | undefined;
  utils: MuiPickersAdapter;
}

/**
 * @ignore - internal component.
 */
export const getHourNumbers = ({
  ampm,
  date,
  getClockNumberText,
  isDisabled,
  selectedId,
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

    const inner = !ampm && (hour === 0 || hour > 12);
    label = utils.formatNumber(label);

    const selected = isSelected(hour);

    hourNumbers.push(
      <ClockNumber
        key={hour}
        id={selected ? selectedId : undefined}
        index={hour}
        inner={inner}
        selected={selected}
        disabled={isDisabled(hour)}
        label={label}
        aria-label={getClockNumberText(label)}
      />,
    );
  }

  return hourNumbers;
};

export const getMinutesNumbers = ({
  utils,
  value,
  isDisabled,
  getClockNumberText,
  selectedId,
}: Omit<GetHourNumbersOptions, 'ampm' | 'date'> & { value: number }) => {
  const f = utils.formatNumber;

  return (
    [
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
    ] as const
  ).map(([numberValue, label], index) => {
    const selected = numberValue === value;
    return (
      <ClockNumber
        key={numberValue}
        label={label}
        id={selected ? selectedId : undefined}
        index={index + 1}
        inner={false}
        disabled={isDisabled(numberValue)}
        selected={selected}
        aria-label={getClockNumberText(label)}
      />
    );
  });
};
