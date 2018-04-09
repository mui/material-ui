import { Utils } from '../typings/utils'

declare class DateFnsUtils extends Utils {
  locale: any;
  constructor (options?: { locale: any });

  date(value: any): Date;
  addDays(value: Date, count: number): Date;
  isValid(value: Date): boolean;
  isEqual(value: Date, comparing: Date): boolean;
  isSameDay(value: Date, comparing: Date): boolean

  isAfter(value: Date, comparing: Date): boolean;
  isAfterDay(value: Date, comparing: Date): boolean;
  isAfterYear(value: Date, comparing: Date): boolean;

  isBeforeDay(value: Date, comparing: Date): boolean;
  isBeforeYear(value: Date, comparing: Date): boolean;
  isBefore(value: Date, comparing: Date): boolean;

  startOfDay(value: Date): Date;
  endOfDay(value: Date): Date;

  format(value: Date, formatString: string): string;
  formatNumber(number: number): string;

  getHours(value: Date): number;
  setHours(value: Date, count: number): Date;
  getMinutes(value: Date): number;
  setMinutes(value: Date, count: number): Date
  getMonth(value: Date): number;
  getYear(value: Date): number;
  setYear(value: Date, count: number): Date;

  getStartOfMonth(value: Date): Date;
  getNextMonth(value: Date): Date;
  getPreviousMonth(value: Date): Date;
 
  getWeekdays(): string[];
  getWeekArray(): Date[];
  getYearRange(): Date[];

  // displaying methods
  getMeridiemText(ampm: 'am' | 'pm'): string;
  getCalendarHeaderText(date: Date): string;
  getDatePickerHeaderText(date: Date): string;
  getDateTimePickerHeaderText(date: Date): string;
  getDayText(date: Date): string;
  getHourText(date: Date, ampm: boolean): string;
  getMinuteText(date: Date): string;
  getYearText(date: Date): string;
}

export default DateFnsUtils