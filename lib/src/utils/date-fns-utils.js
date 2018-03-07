import parse from 'date-fns/parse';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import endOfDay from 'date-fns/endOfDay';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isValid from 'date-fns/isValid';
import setDay from 'date-fns/setDay';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import setYear from 'date-fns/setYear';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';
import getHours from 'date-fns/getHours';
import getYear from 'date-fns/getYear';
import isEqual from 'date-fns/isEqual';

export default class DateFnsUtils {
  static date(value) {
    if (typeof value === 'undefined') {
      return new Date();
    }

    return new Date(value);
  }

  static parse = (value, formatString) => parse(value, formatString, new Date())

  static addDays = addDays

  static isValid = isValid

  static isEqual = isEqual

  static isNull(date) {
    return date == null;
  }

  static isAfter = isAfter

  static isBefore = isBefore

  static isAfterDay(date, value) {
    return isAfter(date, endOfDay(value));
  }

  static isBeforeDay(date, value) {
    return isBefore(date, startOfDay(value));
  }

  static isBeforeYear(date, value) {
    return isBefore(date, startOfYear(value));
  }

  static isAfterYear(date, value) {
    return isAfter(date, endOfYear(value));
  }

  static startOfDay = startOfDay

  static endOfDay = endOfDay

  static format = format

  static formatNumber(num) {
    return num;
  }

  static getHours = getHours

  static setHours = setHours

  static getMinutes(date) {
    return date.getMinutes();
  }

  static setMinutes = setMinutes

  static getMonth(date) {
    return date.getMonth();
  }

  static isSameDay = isSameDay;

  static getMeridiemText(ampm) {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  static getStartOfMonth = startOfMonth

  static getNextMonth(date) {
    return addMonths(date, 1);
  }

  static getPreviousMonth(date) {
    return addMonths(date, -1);
  }

  static getYear = getYear

  static setYear = setYear;

  static getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => format(setDay(new Date(), dayOfWeek), 'dd'));
  }

  static getWeekArray(date) {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));

    const nestedWeeks = [];
    let count = 0;
    let current = start;
    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = addDays(current, 1);
      count += 1;
    }

    return nestedWeeks;
  }

  static getYearRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const years = [];
    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }
    return years;
  }

  // displaying methpds
  static getCalendarHeaderText(date) {
    return format(date, 'MMMM YYYY');
  }

  static getYearText(date) {
    return format(date, 'YYYY');
  }

  static getDatePickerHeaderText(date) {
    return format(date, 'ddd, MMM D');
  }

  static getDateTimePickerHeaderText(date) {
    return format(date, 'MMM D');
  }

  static getDayText(date) {
    return format(date, 'D');
  }

  static getHourText(date, ampm) {
    return format(date, ampm ? 'hh' : 'HH');
  }

  static getMinuteText(date) {
    return format(date, 'mm');
  }
}
