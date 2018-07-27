import { DateTime, Info } from 'luxon';

export default class LuxonUtils {
  parse = DateTime.fromFormat;

  constructor({ locale } = {}) {
    this.locale = locale || 'en';
  }

  date(value) {
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

  addDays(date, count) {
    if (count < 0) {
      return date.minus({ days: Math.abs(count) });
    }

    return date.plus({ days: count });
  }

  isValid(date) {
    return date.isValid;
  }

  isEqual(value, comparing) {
    if (value === null && comparing === null) {
      return true;
    }

    return value === comparing;
  }

  isSameDay(value, comparing) {
    return value.hasSame(comparing, 'day');
  }

  isAfter(value, comparing) {
    return value > comparing;
  }

  isAfterDay(value, comparing) {
    const diff = value.diff(comparing, 'days').toObject();
    return diff.days > 0;
  }

  isAfterYear(value, comparing) {
    const diff = value.diff(comparing, 'years').toObject();
    return diff.years > 0;
  }

  isBefore(value, comparing) {
    return value < comparing;
  }

  isBeforeDay(value, comparing) {
    const diff = value.diff(comparing, 'days').toObject();
    return diff.days < 0;
  }

  isBeforeYear(value, comparing) {
    const diff = value.diff(comparing, 'years').toObject();
    return diff.years < 0;
  }

  getDiff(value, comparing) {
    if (typeof comparing === 'string') {
      comparing = DateTime.fromJSDate(new Date(comparing));
    }

    return value.diff(comparing, 'milliseconds');
  }

  startOfDay(value) {
    return value.startOf('day');
  }

  endOfDay(value) {
    return value.endOf('day');
  }

  format(date, format) {
    return date.setLocale(this.locale).toFormat(format);
  }

  formatNumber(number) {
    return String(number);
  }

  getHours(value) {
    return value.get('hour');
  }

  setHours(value, count) {
    return value.set({ hour: count });
  }

  getMinutes(value) {
    return value.get('minute');
  }

  setMinutes(value, count) {
    return value.set({ minute: count });
  }

  getSeconds(value) {
    return value.get('second');
  }

  setSeconds(value, count) {
    return value.set({ second: count });
  }

  getMonth(value) {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get('month') - 1;
  }

  getYear(value) {
    return value.get('year');
  }

  setYear(value, year) {
    return value.set({ year });
  }

  mergeDateAndTime(date, time) {
    return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
  }

  getStartOfMonth(value) {
    return value.startOf('month');
  }

  getNextMonth(value) {
    return value.plus({ months: 1 });
  }

  getPreviousMonth(value) {
    return value.minus({ months: 1 });
  }

  getWeekdays() {
    return Info.weekdaysFormat('narrow', { locale: this.locale });
  }

  getWeekArray(date) {
    const { days } = date
      .endOf('month')
      .endOf('week')
      .diff(date.startOf('month').startOf('week'), 'days')
      .toObject();

    const weeks = [];
    new Array(Math.round(days))
      .fill()
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

  getYearRange(start, end) {
    start = this.date(start);
    end = this.date(end).plus({ years: 1 });
    const { years } = end.diff(start, 'years').toObject();
    if (!years || years <= 0) {
      return [];
    }

    return new Array(Math.round(years))
      .fill()
      .map((_m, i) => i)
      .map(year => start.plus({ years: year }));
  }

  getMeridiemText(ampm) {
    return Info
      .meridiems({ locale: this.locale })
      .find(v => v.toLowerCase() === ampm.toLowerCase());
  }

  getCalendarHeaderText(date) {
    return this.format(date, 'MMMM yyyy');
  }

  getDatePickerHeaderText(date) {
    return this.format(date, 'ccc, MMM d');
  }

  getDateTimePickerHeaderText(date) {
    return this.format(date, 'MMM d');
  }

  getDayText(date) {
    return this.format(date, 'd');
  }

  getHourText(date, ampm) {
    if (ampm) {
      return date.toFormat('hh');
    }

    return date.toFormat('HH');
  }

  getMinuteText(date) {
    return date.toFormat('mm');
  }

  getSecondText(date) {
    return date.toFormat('ss');
  }

  getYearText(date) {
    return date.toFormat('yyyy');
  }

  isNull(date) {
    return date === null;
  }

  dateTime12hFormat = 'ff';
  dateTime24hFormat = 'f';

  time12hFormat = 't';
  time24hFormat = 'T';

  dateFormat = 'DD';
}
