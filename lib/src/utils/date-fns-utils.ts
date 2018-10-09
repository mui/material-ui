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

  public dateTime12hFormat = 'MMMM do hh:mm aaaa';

  public dateTime24hFormat = 'MMMM do HH:mm';

  public time12hFormat = 'hh:mm a';

  public time24hFormat = 'HH:mm';

  public dateFormat = 'MMMM do';
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

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
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
      { locale: this.locale }
    ).map(day => format(day, 'EEEEEE', { locale: this.locale }));
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
    const years: Date[] = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  }

  // displaying methpds
  public getCalendarHeaderText(date: Date) {
    return format(date, 'MMMM yyyy', { locale: this.locale });
  }

  public getYearText(date: Date) {
    return format(date, 'yyyy', { locale: this.locale });
  }

  public getDatePickerHeaderText(date: Date) {
    return format(date, 'EEE, MMM d', { locale: this.locale });
  }

  public getDateTimePickerHeaderText(date: Date) {
    return format(date, 'MMM d', { locale: this.locale });
  }

  public getDayText(date: Date) {
    return format(date, 'd', { locale: this.locale });
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
