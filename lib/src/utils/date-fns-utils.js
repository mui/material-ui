import dateFnsParse from 'date-fns/parse';
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
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  date(value) {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  }

  parse(value, formatString) {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, formatString, new Date());
  }

  format(date, formatString) {
    return format(date, formatString, { locale: this.locale });
  }

  addDays = addDays

  isValid = isValid

  isEqual = isEqual

  isNull(date) {
    return date === null;
  }

  isAfter = isAfter

  isBefore = isBefore

  isAfterDay(date, value) {
    return isAfter(date, endOfDay(value));
  }

  isBeforeDay(date, value) {
    return isBefore(date, startOfDay(value));
  }

  isBeforeYear(date, value) {
    return isBefore(date, startOfYear(value));
  }

  isAfterYear(date, value) {
    return isAfter(date, endOfYear(value));
  }

  startOfDay = startOfDay

  endOfDay = endOfDay

  formatNumber(num) {
    return num;
  }

  getHours = getHours

  setHours = setHours

  getMinutes(date) {
    return date.getMinutes();
  }

  setMinutes = setMinutes

  getMonth(date) {
    return date.getMonth();
  }

  isSameDay = isSameDay;

  getMeridiemText(ampm) {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  getStartOfMonth = startOfMonth

  getNextMonth(date) {
    return addMonths(date, 1);
  }

  getPreviousMonth(date) {
    return addMonths(date, -1);
  }

  getYear = getYear

  setYear = setYear;

  getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => format(setDay(new Date(), dayOfWeek), 'dd', { locale: this.locale }));
  }

  getWeekArray(date) {
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

  getYearRange(start, end) {
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
  getCalendarHeaderText(date) {
    return format(date, 'MMMM YYYY', { locale: this.locale });
  }

  getYearText(date) {
    return format(date, 'YYYY', { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, 'ddd, MMM D', { locale: this.locale });
  }

  getDateTimePickerHeaderText(date) {
    return format(date, 'MMM D', { locale: this.locale });
  }

  getDayText(date) {
    return format(date, 'D', { locale: this.locale });
  }

  getHourText(date, ampm) {
    return format(date, ampm ? 'hh' : 'HH', { locale: this.locale });
  }

  getMinuteText(date) {
    return format(date, 'mm', { locale: this.locale });
  }
}
