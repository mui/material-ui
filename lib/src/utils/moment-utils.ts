import * as defaultMoment from 'moment';
import { Utils } from '../typings/utils';

type Opts = {
  locale?: string;
  moment?: typeof defaultMoment;
}

type Moment = defaultMoment.Moment

export default class MomentUtils implements Utils<defaultMoment.Moment> {
  moment: typeof defaultMoment;
  locale?: string;

  constructor({ locale, moment }: Opts = {}) {
    this.moment = moment || defaultMoment
    this.locale = locale;
  }

  parse(value, format) {
    return this.moment(value, format, true);
  }

  date(value?: Moment) {
    return this.moment(value);
  }

  isValid(date: Moment) {
    return date.isValid();
  }

  isNull(date: Moment) {
    return date.parsingFlags().nullInput;
  }

  getDiff(date, comparing) {
    return date.diff(comparing);
  }

  isAfter(date, value) {
    return date.isAfter(value);
  }

  isBefore(date, value) {
    return date.isBefore(value);
  }

  isAfterDay(date, value) {
    return date.isAfter(value, 'day');
  }

  isBeforeDay(date, value) {
    return date.isBefore(value, 'day');
  }

  isBeforeYear(date, value) {
    return date.isBefore(value, 'year');
  }

  isAfterYear(date, value) {
    return date.isAfter(value, 'year');
  }

  startOfDay(date: Moment) {
    return date.clone().startOf('day');
  }

  endOfDay(date: Moment) {
    return date.clone().endOf('day');
  }

  format(date, formatString) {
    return date.format(formatString);
  }

  formatNumber(num) {
    return num;
  }

  getHours(date: Moment) {
    return date.get('hours');
  }

  addDays(date: Moment, count: number) {
    return count < 0
      ? date.clone().subtract(Math.abs(count), 'days')
      : date.clone().add(count, 'days');
  }

  setHours(date: Moment, count: number) {
    return date.clone().hours(count);
  }

  getMinutes(date: Moment) {
    return date.get('minutes');
  }

  setMinutes(date: Moment, count: number) {
    return date.clone().minutes(count);
  }

  getSeconds(date: Moment) {
    return date.get('seconds');
  }

  setSeconds(date: Moment, count: number) {
    return date.clone().seconds(count);
  }

  getMonth(date: Moment) {
    return date.get('month');
  }

  isSameDay(date: Moment, comparing: Moment) {
    return date.isSame(comparing, 'day');
  }

  getMeridiemText(ampm: 'am' | 'pm') {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  getStartOfMonth(date: Moment) {
    return date.clone().startOf('month');
  }

  getNextMonth(date: Moment) {
    return date.clone().add(1, 'month');
  }

  getPreviousMonth(date: Moment) {
    return date.clone().subtract(1, 'month');
  }

  getYear(date: Moment) {
    return date.get('year');
  }

  setYear(date: Moment, year: number) {
    return date.clone().set('year', year);
  }

  mergeDateAndTime(date: Moment, time: Moment) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  }

  getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => this.moment().weekday(dayOfWeek).format('dd'));
  }

  isEqual(value: Moment, comparing: Moment) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  }

  getWeekArray(date: Moment) {
    const start = date.clone().startOf('month').startOf('week');
    const end = date.clone().endOf('month').endOf('week');

    let count = 0;
    let current = start;
    const nestedWeeks: Moment[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, 'day');
      count += 1;
    }

    return nestedWeeks;
  }

  getYearRange(start: Moment, end: Moment) {
    const startDate = this.moment(start).startOf('year');
    const endDate = this.moment(end).endOf('year');
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, 'year');
    }

    return years;
  }

  // displaying methods
  getCalendarHeaderText(date: Moment) {
    return date.format('MMMM YYYY');
  }

  getYearText(date: Moment) {
    return date.format('YYYY');
  }

  getDatePickerHeaderText(date: Moment) {
    return date.format('ddd, MMM D');
  }

  getDateTimePickerHeaderText(date: Moment) {
    return date.format('MMM D');
  }

  getDayText(date: Moment) {
    return date.format('D');
  }

  getHourText(date, ampm) {
    return date.format(ampm ? 'hh' : 'HH');
  }

  getMinuteText(date: Moment) {
    return date.format('mm');
  }

  getSecondText(date: Moment) {
    return date.format('ss');
  }

  dateTime12hFormat = 'MMMM Do hh:mm a';

  dateTime24hFormat = 'MMMM Do HH:mm';

  time12hFormat = 'hh:mm A';

  time24hFormat = 'HH:mm';

  dateFormat = 'MMMM Do';
}
