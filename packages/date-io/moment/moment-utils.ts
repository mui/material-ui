import defaultMoment from 'moment';
import { IUtils } from '../IUtils';

interface Opts {
  locale?: string;
  moment?: typeof defaultMoment;
}

type Moment = defaultMoment.Moment;

export default class MomentUtils implements IUtils<defaultMoment.Moment> {
  public moment: typeof defaultMoment;
  public locale?: string;

  public dateTime12hFormat = 'MMMM Do hh:mm a';

  public dateTime24hFormat = 'MMMM Do HH:mm';

  public time12hFormat = 'hh:mm A';

  public time24hFormat = 'HH:mm';

  public dateFormat = 'MMMM Do';

  constructor({ locale, moment }: Opts = {}) {
    this.moment = moment || defaultMoment;
    this.locale = locale;
  }

  public parse(value: string, format: string) {
    return this.moment(value, format, true);
  }

  public date(value?: Moment) {
    return this.moment(value);
  }

  public isValid(date: Moment) {
    return date.isValid();
  }

  public isNull(date: Moment) {
    return date.parsingFlags().nullInput;
  }

  public getDiff(date: Moment, comparing: Moment) {
    return date.diff(comparing);
  }

  public isAfter(date: Moment, value: Moment) {
    return date.isAfter(value);
  }

  public isBefore(date: Moment, value: Moment) {
    return date.isBefore(value);
  }

  public isAfterDay(date: Moment, value: Moment) {
    return date.isAfter(value, 'day');
  }

  public isBeforeDay(date: Moment, value: Moment) {
    return date.isBefore(value, 'day');
  }

  public isBeforeYear(date: Moment, value: Moment) {
    return date.isBefore(value, 'year');
  }

  public isAfterYear(date: Moment, value: Moment) {
    return date.isAfter(value, 'year');
  }

  public startOfDay(date: Moment) {
    return date.clone().startOf('day');
  }

  public endOfDay(date: Moment) {
    return date.clone().endOf('day');
  }

  public format(date: Moment, formatString: string) {
    return date.format(formatString);
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getHours(date: Moment) {
    return date.get('hours');
  }

  public addDays(date: Moment, count: number) {
    return count < 0
      ? date.clone().subtract(Math.abs(count), 'days')
      : date.clone().add(count, 'days');
  }

  public setHours(date: Moment, count: number) {
    return date.clone().hours(count);
  }

  public getMinutes(date: Moment) {
    return date.get('minutes');
  }

  public setMinutes(date: Moment, count: number) {
    return date.clone().minutes(count);
  }

  public getSeconds(date: Moment) {
    return date.get('seconds');
  }

  public setSeconds(date: Moment, count: number) {
    return date.clone().seconds(count);
  }

  public getMonth(date: Moment) {
    return date.get('month');
  }

  public isSameDay(date: Moment, comparing: Moment) {
    return date.isSame(comparing, 'day');
  }

  public getMeridiemText(ampm: 'am' | 'pm') {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  public getStartOfMonth(date: Moment) {
    return date.clone().startOf('month');
  }

  public getNextMonth(date: Moment) {
    return date.clone().add(1, 'month');
  }

  public getPreviousMonth(date: Moment) {
    return date.clone().subtract(1, 'month');
  }

  public getYear(date: Moment) {
    return date.get('year');
  }

  public setYear(date: Moment, year: number) {
    return date.clone().set('year', year);
  }

  public mergeDateAndTime(date: Moment, time: Moment) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek =>
      this.moment()
        .weekday(dayOfWeek)
        .format('dd')
    );
  }

  public isEqual(value: Moment, comparing: Moment) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  }

  public getWeekArray(date: Moment) {
    const start = date
      .clone()
      .startOf('month')
      .startOf('week');
    const end = date
      .clone()
      .endOf('month')
      .endOf('week');

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

  public getYearRange(start: Moment, end: Moment) {
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
  public getCalendarHeaderText(date: Moment) {
    return date.format('MMMM YYYY');
  }

  public getYearText(date: Moment) {
    return date.format('YYYY');
  }

  public getDatePickerHeaderText(date: Moment) {
    return date.format('ddd, MMM D');
  }

  public getDateTimePickerHeaderText(date: Moment) {
    return date.format('MMM D');
  }

  public getDayText(date: Moment) {
    return date.format('D');
  }

  public getHourText(date: Moment, ampm: boolean) {
    return date.format(ampm ? 'hh' : 'HH');
  }

  public getMinuteText(date: Moment) {
    return date.format('mm');
  }

  public getSecondText(date: Moment) {
    return date.format('ss');
  }
}
