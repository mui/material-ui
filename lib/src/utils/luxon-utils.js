import { DateTime } from 'luxon';

export default class LuxonUtils {
    parse = DateTime.fromFormat;

    constructor({ locale } = {}) {
      this.locale = locale;
    }

    date(value) {
      if (typeof value === 'undefined') {
        return DateTime.local();
      }

      return DateTime.fromJSDate(value);
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

    startOfDay(value) {
      return value.startOf('day');
    }

    endOfDay(value) {
      return value.endOf('day');
    }

    format(date, format) {
      return date.toFormat(format);
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

    isNull(date) {
      return date === null;
    }
}
