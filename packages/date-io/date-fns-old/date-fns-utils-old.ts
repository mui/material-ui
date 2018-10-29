import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfDay from 'date-fns/endOfDay';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import format from 'date-fns/format';
import getHours from 'date-fns/getHours';
import getSeconds from 'date-fns/getSeconds';
import getYear from 'date-fns/getYear';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import isSameDay from 'date-fns/isSameDay';
import isValid from 'date-fns/isValid';
import dateFnsParse from 'date-fns/parse';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import setSeconds from 'date-fns/setSeconds';
import setYear from 'date-fns/setYear';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';
import { IUtils } from '../IUtils';

// date-fns < 2.0.0-alpha.8
export default class DateFnsUtils implements IUtils<Date> {
  public locale?: Locale;

  public addDays = addDays;

  public isValid = isValid;

  public getDiff = differenceInMilliseconds;

  public isAfter = isAfter;

  public isBefore = isBefore;

  public startOfDay = startOfDay;

  public endOfDay = endOfDay;

  public getHours = getHours;

  public setHours = setHours;

  public setMinutes = setMinutes;

  public getSeconds = getSeconds;

  public setSeconds = setSeconds;

  public isSameDay = isSameDay;

  public getStartOfMonth = startOfMonth;

  public getYear = getYear;

  public setYear = setYear;

  public dateTime12hFormat = 'MMMM Do hh:mm a';

  public dateTime24hFormat = 'MMMM Do HH:mm';

  public time12hFormat = 'hh:mm A';

  public time24hFormat = 'HH:mm';

  public dateFormat = 'MMMM Do';
  constructor({ locale }: { locale?: Locale } = {}) {
    this.locale = locale;
  }

  public date(value?: any) {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  }

  public parse(value: string, formatString: string) {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, formatString, new Date());
  }

  public format(date: Date, formatString: string) {
    return format(date, formatString, { locale: this.locale });
  }

  public isEqual(date: Date, comparing: Date) {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  }

  public isNull(date: Date) {
    return date === null;
  }

  public isAfterDay(date: Date, value: Date) {
    return isAfter(date, endOfDay(value));
  }

  public isBeforeDay(date: Date, value: Date) {
    return isBefore(date, startOfDay(value));
  }

  public isBeforeYear(date: Date, value: Date) {
    return isBefore(date, startOfYear(value));
  }

  public isAfterYear(date: Date, value: Date) {
    return isAfter(date, endOfYear(value));
  }

  public formatNumber(num: string) {
    return num;
  }

  public getMinutes(date: Date) {
    return date.getMinutes();
  }

  public getMonth(date: Date) {
    return date.getMonth();
  }

  public getMeridiemText(ampm: 'am' | 'pm') {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  public getNextMonth(date: Date) {
    return addMonths(date, 1);
  }

  public getPreviousMonth(date: Date) {
    return addMonths(date, -1);
  }

  public mergeDateAndTime(date: Date, time: Date) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public getWeekdays() {
    const now = new Date();
    return eachDayOfInterval(
      {
        start: startOfWeek(now, { locale: this.locale }),
        end: endOfWeek(now, { locale: this.locale }),
      },
      {
        locale: this.locale,
      }
    ).map(day => format(day, 'dd', { locale: this.locale }));
  }

  public getWeekArray(date: Date) {
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

  public getYearRange(start: Date, end: Date) {
    const startDate = startOfYear(new Date(start));
    const endDate = endOfYear(new Date(end));
    const years = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  }

  // displaying methpds
  public getCalendarHeaderText(date: Date) {
    return format(date, 'MMMM YYYY', { locale: this.locale });
  }

  public getYearText(date: Date) {
    return format(date, 'YYYY', { locale: this.locale });
  }

  public getDatePickerHeaderText(date: Date) {
    return format(date, 'ddd, MMM D', { locale: this.locale });
  }

  public getDateTimePickerHeaderText(date: Date) {
    return format(date, 'MMM D', { locale: this.locale });
  }

  public getDayText(date: Date) {
    return format(date, 'D', { locale: this.locale });
  }

  public getHourText(date: Date, ampm: boolean) {
    return format(date, ampm ? 'hh' : 'HH', { locale: this.locale });
  }

  public getMinuteText(date: Date) {
    return format(date, 'mm', { locale: this.locale });
  }

  public getSecondText(date: Date) {
    return format(date, 'ss', { locale: this.locale });
  }
}
