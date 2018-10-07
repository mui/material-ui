import * as addDays from 'date-fns/addDays';
import * as addMonths from 'date-fns/addMonths';
import * as addYears from 'date-fns/addYears';
import * as differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import * as eachDayOfInterval from 'date-fns/eachDayOfInterval';
import * as endOfDay from 'date-fns/endOfDay';
import * as endOfMonth from 'date-fns/endOfMonth';
import * as endOfWeek from 'date-fns/endOfWeek';
import * as endOfYear from 'date-fns/endOfYear';
import * as format from 'date-fns/format';
import * as getHours from 'date-fns/getHours';
import * as getSeconds from 'date-fns/getSeconds';
import * as getYear from 'date-fns/getYear';
import * as isAfter from 'date-fns/isAfter';
import * as isBefore from 'date-fns/isBefore';
import * as isEqual from 'date-fns/isEqual';
import * as isSameDay from 'date-fns/isSameDay';
import * as isValid from 'date-fns/isValid';
import * as dateFnsParse from 'date-fns/parse';
import * as setHours from 'date-fns/setHours';
import * as setMinutes from 'date-fns/setMinutes';
import * as setSeconds from 'date-fns/setSeconds';
import * as setYear from 'date-fns/setYear';
import * as startOfDay from 'date-fns/startOfDay';
import * as startOfMonth from 'date-fns/startOfMonth';
import * as startOfWeek from 'date-fns/startOfWeek';
import * as startOfYear from 'date-fns/startOfYear';
import { Utils } from '../typings/utils';

export default class DateFnsUtils implements Utils<Date> {
  locale?: Locale;
  constructor({ locale }: { locale?: Locale } = {}) {
    this.locale = locale;
  }

  date(value?: any) {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  }

  parse(value: string, formatString: string) {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, formatString, new Date());
  }

  format(date: Date, formatString: string) {
    return format(date, formatString, { locale: this.locale });
  }

  isEqual(date: Date, comparing: Date) {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  }

  addDays = addDays

  isValid = isValid

  getDiff = differenceInMilliseconds

  isNull(date: Date) {
    return date === null;
  }

  isAfter = isAfter

  isBefore = isBefore

  isAfterDay(date: Date, value: Date) {
    return isAfter(date, endOfDay(value));
  }

  isBeforeDay(date: Date, value: Date) {
    return isBefore(date, startOfDay(value));
  }

  isBeforeYear(date: Date, value: Date) {
    return isBefore(date, startOfYear(value));
  }

  isAfterYear(date: Date, value: Date) {
    return isAfter(date, endOfYear(value));
  }

  startOfDay = startOfDay

  endOfDay = endOfDay

  formatNumber(num: number) {
    return num.toString();
  }

  getHours = getHours

  setHours = setHours

  getMinutes(date: Date) {
    return date.getMinutes();
  }

  setMinutes = setMinutes

  getSeconds = getSeconds

  setSeconds = setSeconds

  getMonth(date: Date) {
    return date.getMonth();
  }

  isSameDay = isSameDay;

  getMeridiemText(ampm: 'am' | 'pm') {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  getStartOfMonth = startOfMonth

  getNextMonth(date: Date) {
    return addMonths(date, 1);
  }

  getPreviousMonth(date: Date) {
    return addMonths(date, -1);
  }

  getYear = getYear;

  setYear = setYear;

  mergeDateAndTime(date: Date, time: Date) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  }

  getWeekdays() {
    const now = new Date();
    return eachDayOfInterval(
      {
        start: startOfWeek(now, { locale: this.locale }),
        end: endOfWeek(now, { locale: this.locale }),
      },
      { locale: this.locale },
    ).map(day => format(day, 'EEEEEE', { locale: this.locale }));
  }

  getWeekArray(date: Date) {
    const start = startOfWeek(startOfMonth(date), { locale: this.locale });
    const end = endOfWeek(endOfMonth(date), { locale: this.locale });

    let count = 0;
    let current = start;
    const nestedWeeks: Date[][] = [];

    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = addDays(current, 1);
      count += 1;
    }

    return nestedWeeks;
  }

  getYearRange(start: Date, end: Date) {
    const startDate = startOfYear(new Date(start));
    const endDate = endOfYear(new Date(end));
    const years: Date[] = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  }

  // displaying methpds
  getCalendarHeaderText(date: Date) {
    return format(date, 'MMMM yyyy', { locale: this.locale });
  }

  getYearText(date: Date) {
    return format(date, 'yyyy', { locale: this.locale });
  }

  getDatePickerHeaderText(date: Date) {
    return format(date, 'EEE, MMM d', { locale: this.locale });
  }

  getDateTimePickerHeaderText(date: Date) {
    return format(date, 'MMM d', { locale: this.locale });
  }

  getDayText(date: Date) {
    return format(date, 'd', { locale: this.locale });
  }

  getHourText(date, ampm) {
    return format(date, ampm ? 'hh' : 'HH', { locale: this.locale });
  }

  getMinuteText(date: Date) {
    return format(date, 'mm', { locale: this.locale });
  }

  getSecondText(date: Date) {
    return format(date, 'ss', { locale: this.locale });
  }

  dateTime12hFormat = 'MMMM do hh:mm aaaa';

  dateTime24hFormat = 'MMMM do HH:mm';

  time12hFormat = 'hh:mm a';

  time24hFormat = 'HH:mm';

  dateFormat = 'MMMM do';
}
