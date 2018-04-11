import { MaterialUiPickersDate } from './date'

export class Utils {
  locale: any;
  constructor (options?: { locale: any, moment: any });

  date(value: any): MaterialUiPickersDate;
  addDays(value: MaterialUiPickersDate, count: number): MaterialUiPickersDate;
  isValid(value: MaterialUiPickersDate): boolean;
  isEqual(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isSameDay(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean

  isAfter(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isAfterDay(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isAfterYear(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;

  isBeforeDay(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isBeforeYear(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;
  isBefore(value: MaterialUiPickersDate, comparing: MaterialUiPickersDate): boolean;

  startOfDay(value: MaterialUiPickersDate): MaterialUiPickersDate;
  endOfDay(value: MaterialUiPickersDate): MaterialUiPickersDate;

  format(value: MaterialUiPickersDate, formatString: string): string;
  formatNumber(number: number): string;

  getHours(value: MaterialUiPickersDate): number;
  setHours(value: MaterialUiPickersDate, count: number): MaterialUiPickersDate;
  getMinutes(value: MaterialUiPickersDate): number;
  setMinutes(value: MaterialUiPickersDate, count: number): MaterialUiPickersDate
  getMonth(value: MaterialUiPickersDate): number;
  getYear(value: MaterialUiPickersDate): number;
  setYear(value: MaterialUiPickersDate, count: number): MaterialUiPickersDate;

  getStartOfMonth(value: MaterialUiPickersDate): MaterialUiPickersDate;
  getNextMonth(value: MaterialUiPickersDate): MaterialUiPickersDate;
  getPreviousMonth(value: MaterialUiPickersDate): MaterialUiPickersDate;
 
  getWeekdays(): string[];
  getWeekArray(date: MaterialUiPickersDate): MaterialUiPickersDate[];
  getYearRange(start: MaterialUiPickersDate, end: MaterialUiPickersDate): MaterialUiPickersDate[];

  // displaying methods
  getMeridiemText(ampm: 'am' | 'pm'): string;
  getCalendarHeaderText(date: MaterialUiPickersDate): string;
  getDatePickerHeaderText(date: MaterialUiPickersDate): string;
  getDateTimePickerHeaderText(date: MaterialUiPickersDate): string;
  getDayText(date: MaterialUiPickersDate): string;
  getHourText(date: MaterialUiPickersDate, ampm: boolean): string;
  getMinuteText(date: MaterialUiPickersDate): string;
  getYearText(date: MaterialUiPickersDate): string;
}