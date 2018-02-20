import { MaterialUiPickersDate } from './date'
import { isEqual, isAfter, endOfDay, setHours } from 'date-fns';

export interface Utils {
  date(value: any): MaterialUiPickersDate;
  addDays(value: MaterialUiPickersDate, count: Number): MaterialUiPickersDate;
  isValid(value: MaterialUiPickersDate): boolean;
  isEqual(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isNull(value: MaterialUiPickersDate): boolean;
  isAfter(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isAfterDay(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isBeforeDay(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isBeforeYear(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isAfterYear(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  startOfDay(value: MaterialUiPickersDate): MaterialUiPickersDate;
  endOfDay(value: MaterialUiPickersDate): MaterialUiPickersDate;
  format(value: MaterialUiPickersDate): string;
  formatNumber(number: number): MaterialUiPickersDate
  getHours(value: MaterialUiPickersDate): number;
  setHours(value: MaterialUiPickersDate, count: number): MaterialUiPickersDate;
  getMinutes(value: MaterialUiPickersDate): number;
  setMinutes(value: MaterialUiPickersDate, count: number): MaterialUiPickersDate
  getMonth(value: MaterialUiPickersDate): number;
  isSameDay(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean
  getMeridiemText(ampm: boolean): string;
  getStartOfMonth(value: MaterialUiPickersDate): MaterialUiPickersDate;
  getNextMonth(value: MaterialUiPickersDate): MaterialUiPickersDate;
  getPreviousMonth(value: MaterialUiPickersDate): MaterialUiPickersDate;
  getYear(value: MaterialUiPickersDate): number;
  setYear(value: MaterialUiPickersDate): MaterialUiPickersDate;
  getWeekDays(): string[];
  getWeekArray(): MaterialUiPickersDate[];
  getYearRange(): MaterialUiPickersDate[];
}