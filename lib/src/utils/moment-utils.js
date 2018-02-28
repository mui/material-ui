import moment from 'moment';

export default class MomentUtils {
  static parse = moment

  static date(value, formatString) {
    return moment(value, formatString);
  }

  static isValid(date) {
    return date.isValid();
  }

  static isNull(date) {
    return date.parsingFlags().nullInput;
  }

  static isAfter(date, value) {
    return date.isAfter(value);
  }

  static isBefore(date, value) {
    return date.isBefore(value);
  }

  static isAfterDay(date, value) {
    return date.isAfter(value, 'day');
  }

  static isBeforeDay(date, value) {
    return date.isBefore(value, 'day');
  }

  static isBeforeYear(date, value) {
    return date.isBefore(value, 'year');
  }

  static isAfterYear(date, value) {
    return date.isAfter(value, 'year');
  }

  static startOfDay(date) {
    return date.startOf('day');
  }

  static endOfDay(date) {
    return date.endOf('day');
  }

  static format(date, formatString) {
    return date.format(formatString);
  }

  static formatNumber(num) {
    return num;
  }

  static getHours(date) {
    return date.get('hours');
  }

  static addDays(date, count) {
    return count < 0
      ? date.clone().subtract(Math.abs(count), 'days')
      : date.clone().add(count, 'days');
  }

  static setHours(date, value) {
    return date.clone().hours(value);
  }

  static getMinutes(date) {
    return date.get('minutes');
  }

  static setMinutes(date, value) {
    return date.clone().minutes(value);
  }

  static getMonth(date) {
    return date.get('month');
  }

  static isSameDay(date, comparing) {
    return date.isSame(comparing, 'day');
  }

  static getMeridiemText(ampm) {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  static getStartOfMonth(date) {
    return date.clone().startOf('month');
  }

  static getNextMonth(date) {
    return date.clone().add(1, 'month');
  }

  static getPreviousMonth(date) {
    return date.clone().subtract(1, 'month');
  }

  static getYear(date) {
    return date.get('year');
  }

  static setYear(date, year) {
    return date.clone().set('year', year);
  }

  static getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => moment().weekday(dayOfWeek).format('dd')[0]);
  }

  static isEqual(value, comparing) {
    return moment(value).isSame(comparing);
  }

  static getWeekArray(date) {
    const start = date.clone().startOf('month').startOf('week');
    const end = date.clone().endOf('month').endOf('week');

    const nestedWeeks = [];
    let count = 0;
    let current = start;
    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = current.clone().add(1, 'day');
      count += 1;
    }

    return nestedWeeks;
  }

  static getYearRange(start, end) {
    const startDate = moment(start);
    const endDate = moment(end);
    const years = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, 'year');
    }

    return years;
  }

  // displaying methods
  static getCalendarHeaderText(date) {
    return date.format('MMMM YYYY');
  }

  static getYearText(date) {
    return date.format('YYYY');
  }

  static getDatePickerHeaderText(date) {
    return date.format('ddd, MMM D');
  }

  static getDateTimePickerHeaderText(date) {
    return date.format('MMM D');
  }

  static getDayText(date) {
    return date.format('D');
  }

  static getHourText(date, ampm) {
    return date.format(ampm ? 'hh' : 'HH');
  }

  static getMinuteText(date) {
    return date.format('mm');
  }
}
