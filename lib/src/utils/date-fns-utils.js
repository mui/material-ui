import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import endOfDay from 'date-fns/end_of_day';
import endOfMonth from 'date-fns/end_of_month';
import endOfWeek from 'date-fns/end_of_week';
import endOfYear from 'date-fns/end_of_year';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isSameDay from 'date-fns/is_same_day';
import isValid from 'date-fns/is_valid';
import setDay from 'date-fns/set_day';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import setYear from 'date-fns/set_year';
import startOfDay from 'date-fns/start_of_day';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import startOfYear from 'date-fns/start_of_year';
import getHours from 'date-fns/get_hours';
import getYear from 'date-fns/get_year';
import isEqual from 'date-fns/is_equal';

export default class DateFnsUtils {
  static date(value) {
    return new Date(value);
  }

  static addDays = addDays

  static isValid = isValid

  static isEqual = isEqual

  static isNull(date) {
    return date == null;
  }

  static isAfter = isAfter

  static isBefore = isBefore

  static isAfterDay(date, value) {
    return isAfter(endOfDay(date), value);
  }

  static isBeforeDay(date, value) {
    return isBefore(date, startOfDay(value));
  }

  static isBeforeYear(date, value) {
    return isBefore(date, startOfYear(value));
  }

  static isAfterYear(date, value) {
    return isAfter(endOfYear(date), value);
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

  static toNativeDate(date) {
    return date;
  }
}
