export class Utils<TDate> {
  locale: any;
  constructor (options?: { locale: any, moment: any });

  date(value: any): TDate;
  addDays(value: TDate, count: number): TDate;
  isValid(value: TDate): boolean;
  isEqual(value: TDate, comparing: TDate): boolean;
  isSameDay(value: TDate, comparing: TDate): boolean

  isAfter(value: TDate, comparing: TDate): boolean;
  isAfterDay(value: TDate, comparing: TDate): boolean;
  isAfterYear(value: TDate, comparing: TDate): boolean;

  isBeforeDay(value: TDate, comparing: TDate): boolean;
  isBeforeYear(value: TDate, comparing: TDate): boolean;
  isBefore(value: TDate, comparing: TDate): boolean;

  startOfDay(value: TDate): TDate;
  endOfDay(value: TDate): TDate;

  format(value: TDate, formatString: string): string;
  formatNumber(number: number): string;

  getHours(value: TDate): number;
  setHours(value: TDate, count: number): TDate;
  getMinutes(value: TDate): number;
  setMinutes(value: TDate, count: number): TDate
  getMonth(value: TDate): number;
  getYear(value: TDate): number;
  setYear(value: TDate, count: number): TDate;

  getStartOfMonth(value: TDate): TDate;
  getNextMonth(value: TDate): TDate;
  getPreviousMonth(value: TDate): TDate;
 
  getWeekdays(): string[];
  getWeekArray(date: TDate): TDate[];
  getYearRange(start: TDate, end: TDate): TDate[];

  // displaying methods
  getMeridiemText(ampm: 'am' | 'pm'): string;
  getCalendarHeaderText(date: TDate): string;
  getDatePickerHeaderText(date: TDate): string;
  getDateTimePickerHeaderText(date: TDate): string;
  getDayText(date: TDate): string;
  getHourText(date: TDate, ampm: boolean): string;
  getMinuteText(date: TDate): string;
  getYearText(date: TDate): string;
}