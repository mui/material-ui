import { Utils } from '../typings/utils'
import { Moment } from 'moment'

declare class MomentUtils extends Utils {
  locale: any;
  constructor (options?: { locale: string, moment: Moment});

  date(value: any): Moment;
  addDays(value: Moment, count: number): Moment;
  isValid(value: Moment): boolean;
  isEqual(value: Moment, comparing: Moment): boolean;
  isSameDay(value: Moment, comparing: Moment): boolean

  isAfter(value: Moment, comparing: Moment): boolean;
  isAfterDay(value: Moment, comparing: Moment): boolean;
  isAfterYear(value: Moment, comparing: Moment): boolean;

  isBeforeDay(value: Moment, comparing: Moment): boolean;
  isBeforeYear(value: Moment, comparing: Moment): boolean;
  isBefore(value: Moment, comparing: Moment): boolean;

  startOfDay(value: Moment): Moment;
  endOfDay(value: Moment): Moment;

  format(value: Moment, formatString: string): string;
  formatNumber(number: number): string;

  getHours(value: Moment): number;
  setHours(value: Moment, count: number): Moment;
  getMinutes(value: Moment): number;
  setMinutes(value: Moment, count: number): Moment
  getMonth(value: Moment): number;
  getYear(value: Moment): number;
  setYear(value: Moment, count: number): Moment;

  getStartOfMonth(value: Moment): Moment;
  getNextMonth(value: Moment): Moment;
  getPreviousMonth(value: Moment): Moment;
 
  getWeekdays(): string[];
  getWeekArray(): Moment[];
  getYearRange(): Moment[];

  // displaying methods
  getMeridiemText(ampm: 'am' | 'pm'): string;
  getCalendarHeaderText(Moment: Moment): string;
  getMomentPickerHeaderText(Moment: Moment): string;
  getMomentTimePickerHeaderText(Moment: Moment): string;
  getDayText(Moment: Moment): string;
  getHourText(Moment: Moment, ampm: boolean): string;
  getMinuteText(Moment: Moment): string;
  getYearText(Moment: Moment): string;
}

export default MomentUtils