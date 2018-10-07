import { DateTime, Info } from 'luxon';
import { Utils } from '../typings/utils';

export default class LuxonUtils implements Utils<DateTime> {
  locale: string;
  parse = DateTime.fromFormat;

  constructor({ locale = 'en' }) {
    this.locale = locale;
  }

  date(value?: any) {
    if (value instanceof Date) {
      return DateTime.fromJSDate(value);
    }

    if (typeof value === 'string') {
      return DateTime.fromJSDate(new Date(value));
    }

    if (value instanceof DateTime) {
      return value;
    }

    return DateTime.local();
  }

  addDays(date: DateTime, count: number) {
    if (count < 0) {
      return date.minus({ days: Math.abs(count) });
    }

    return date.plus({ days: count });
  }

  isValid(date: DateTime) {
    return date.isValid;
  }

  isEqual(value: DateTime, comparing: DateTime) {
    if (value === null && comparing === null) {
      return true;
    }

    return value === comparing;
  }

  isSameDay(value: DateTime, comparing: DateTime) {
    return value.hasSame(comparing, 'day');
  }

  isAfter(value: DateTime, comparing: DateTime) {
    return value > comparing;
  }

  isAfterDay(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'days').toObject();
    return diff.days! > 0;
  }

  isAfterYear(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'years').toObject();
    return diff.years! > 0;
  }

  isBefore(value: DateTime, comparing: DateTime) {
    return value < comparing;
  }

  isBeforeDay(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'days').toObject();
    return diff.days! < 0;
  }

  isBeforeYear(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'years').toObject();
    return diff.years! < 0;
  }

  getDiff(value: DateTime, comparing: DateTime) {
    if (typeof comparing === 'string') {
      comparing = DateTime.fromJSDate(new Date(comparing));
    }

    return value.diff(comparing).as('millisecond');
  }

  startOfDay(value: DateTime) {
    return value.startOf('day');
  }

  endOfDay(value: DateTime) {
    return value.endOf('day');
  }

  format(date: DateTime, format: string) {
    return date.setLocale(this.locale).toFormat(format);
  }

  formatNumber(number: number) {
    return String(number);
  }

  getHours(value: DateTime) {
    return value.get('hour');
  }

  setHours(value: DateTime, count: number) {
    return value.set({ hour: count });
  }

  getMinutes(value: DateTime) {
    return value.get('minute');
  }

  setMinutes(value: DateTime, count: number) {
    return value.set({ minute: count });
  }

  getSeconds(value: DateTime) {
    return value.get('second');
  }

  setSeconds(value: DateTime, count: number) {
    return value.set({ second: count });
  }

  getMonth(value: DateTime) {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get('month') - 1;
  }

  getYear(value: DateTime) {
    return value.get('year');
  }

  setYear(value: DateTime, year: number) {
    return value.set({ year });
  }

  mergeDateAndTime(date: DateTime, time: DateTime) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  }

  getStartOfMonth(value: DateTime) {
    return value.startOf('month');
  }

  getNextMonth(value: DateTime) {
    return value.plus({ months: 1 });
  }

  getPreviousMonth(value: DateTime) {
    return value.minus({ months: 1 });
  }

  getWeekdays() {
    return Info.weekdaysFormat('narrow', { locale: this.locale });
  }

  getWeekArray(date: DateTime) {
    const { days } = date
      .endOf('month')
      .endOf('week')
      .diff(date.startOf('month').startOf('week'), 'days')
      .toObject();

    const weeks: DateTime[][] = [];
    new Array(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map(day => date.startOf('month').startOf('week').plus({ days: day }))
      .forEach((v, i) => {
        if (i === 0 || ((i % 7 === 0) && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks;
  }

  getYearRange(start: DateTime, end: DateTime) {
    start = this.date(start);
    end = this.date(end).plus({ years: 1 });
    const { years } = end.diff(start, 'years').toObject();
    if (!years || years <= 0) {
      return [];
    }

    return new Array(Math.round(years))
      .fill(0)
      .map((_m, i) => i)
      .map(year => start.plus({ years: year }));
  }

  getMeridiemText(ampm: 'am' | 'pm') {
    return Info
      .meridiems({ locale: this.locale })
      .find(v => v.toLowerCase() === ampm.toLowerCase())!;
  }

  getCalendarHeaderText(date: DateTime) {
    return this.format(date, 'MMMM yyyy');
  }

  getDatePickerHeaderText(date: DateTime) {
    return this.format(date, 'ccc, MMM d');
  }

  getDateTimePickerHeaderText(date: DateTime) {
    return this.format(date, 'MMM d');
  }

  getDayText(date: DateTime) {
    return this.format(date, 'd');
  }

  getHourText(date: DateTime, ampm: boolean) {
    if (ampm) {
      return date.toFormat('hh');
    }

    return date.toFormat('HH');
  }

  getMinuteText(date: DateTime) {
    return date.toFormat('mm');
  }

  getSecondText(date: DateTime) {
    return date.toFormat('ss');
  }

  getYearText(date: DateTime) {
    return date.toFormat('yyyy');
  }

  isNull(date: DateTime) {
    return date === null;
  }

  dateTime12hFormat = 'ff';

  dateTime24hFormat = 'f';

  time12hFormat = 't';

  time24hFormat = 'T';

  dateFormat = 'DD';
}
