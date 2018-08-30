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

  isEqual(date, comparing) {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  }

  addDays = addDays

  isValid = isValid

  getDiff = differenceInMilliseconds

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

  getSeconds = getSeconds

  setSeconds = setSeconds

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

  getYear = getYear;

  setYear = setYear;

  mergeDateAndTime(date, time) {
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

  getWeekArray(date) {
    const start = startOfWeek(startOfMonth(date), { locale: this.locale });
    const end = endOfWeek(endOfMonth(date), { locale: this.locale });

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
  getCalendarHeaderText(date) {
    return format(date, 'MMMM yyyy', { locale: this.locale });
  }

  getYearText(date) {
    return format(date, 'yyyy', { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, 'EEE, MMM d', { locale: this.locale });
  }

  getDateTimePickerHeaderText(date) {
    return format(date, 'MMM d', { locale: this.locale });
  }

  getDayText(date) {
    return format(date, 'd', { locale: this.locale });
  }

  getHourText(date, ampm) {
    return format(date, ampm ? 'hh' : 'HH', { locale: this.locale });
  }

  getMinuteText(date) {
    return format(date, 'mm', { locale: this.locale });
  }

  getSecondText(date) {
    return format(date, 'ss', { locale: this.locale });
  }

  dateTime12hFormat = 'MMMM do hh:mm aaaa';

  dateTime24hFormat = 'MMMM do HH:mm';

  time12hFormat = 'hh:mm a';

  time24hFormat = 'HH:mm';

  dateFormat = 'MMMM do';
}
