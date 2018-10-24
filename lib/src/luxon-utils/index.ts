import { DateTime, Info } from 'luxon';
import { Utils } from '../typings/utils';

export default class LuxonUtils implements Utils<DateTime> {
  public locale: string;
  public parse = DateTime.fromFormat;

  public dateTime12hFormat = 'ff';

  public dateTime24hFormat = 'f';

  public time12hFormat = 't';

  public time24hFormat = 'T';

  public dateFormat = 'DD';

  constructor({ locale }: { locale?: string } = {}) {
    this.locale = locale || 'en';
  }

  public date(value?: any) {
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

  public addDays(date: DateTime, count: number) {
    if (count < 0) {
      return date.minus({ days: Math.abs(count) });
    }

    return date.plus({ days: count });
  }

  public isValid(date: DateTime) {
    return date.isValid;
  }

  public isEqual(value: DateTime, comparing: DateTime) {
    if (value === null && comparing === null) {
      return true;
    }

    return value === comparing;
  }

  public isSameDay(value: DateTime, comparing: DateTime) {
    return value.hasSame(comparing, 'day');
  }

  public isAfter(value: DateTime, comparing: DateTime) {
    return value > comparing;
  }

  public isAfterDay(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'days').toObject();
    return diff.days! > 0;
  }

  public isAfterYear(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'years').toObject();
    return diff.years! > 0;
  }

  public isBefore(value: DateTime, comparing: DateTime) {
    return value < comparing;
  }

  public isBeforeDay(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'days').toObject();
    return diff.days! < 0;
  }

  public isBeforeYear(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing, 'years').toObject();
    return diff.years! < 0;
  }

  public getDiff(value: DateTime, comparing: DateTime) {
    if (typeof comparing === 'string') {
      comparing = DateTime.fromJSDate(new Date(comparing));
    }

    return value.diff(comparing).as('millisecond');
  }

  public startOfDay(value: DateTime) {
    return value.startOf('day');
  }

  public endOfDay(value: DateTime) {
    return value.endOf('day');
  }

  public format(date: DateTime, format: string) {
    return date.setLocale(this.locale).toFormat(format);
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getHours(value: DateTime) {
    return value.get('hour');
  }

  public setHours(value: DateTime, count: number) {
    return value.set({ hour: count });
  }

  public getMinutes(value: DateTime) {
    return value.get('minute');
  }

  public setMinutes(value: DateTime, count: number) {
    return value.set({ minute: count });
  }

  public getSeconds(value: DateTime) {
    return value.get('second');
  }

  public setSeconds(value: DateTime, count: number) {
    return value.set({ second: count });
  }

  public getMonth(value: DateTime) {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get('month') - 1;
  }

  public getYear(value: DateTime) {
    return value.get('year');
  }

  public setYear(value: DateTime, year: number) {
    return value.set({ year });
  }

  public mergeDateAndTime(date: DateTime, time: DateTime) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public getStartOfMonth(value: DateTime) {
    return value.startOf('month');
  }

  public getNextMonth(value: DateTime) {
    return value.plus({ months: 1 });
  }

  public getPreviousMonth(value: DateTime) {
    return value.minus({ months: 1 });
  }

  public getWeekdays() {
    return Info.weekdaysFormat('narrow', { locale: this.locale });
  }

  public getWeekArray(date: DateTime) {
    const { days } = date
      .endOf('month')
      .endOf('week')
      .diff(date.startOf('month').startOf('week'), 'days')
      .toObject();

    const weeks: DateTime[][] = [];
    new Array(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map(day =>
        date
          .startOf('month')
          .startOf('week')
          .plus({ days: day })
      )
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks;
  }

  public getYearRange(start: DateTime, end: DateTime) {
    start = this.date(start);
    end = this.date(end).plus({ years: 1 });
    const { years } = end.diff(start, 'years').toObject();
    if (!years || years <= 0) {
      return [];
    }

    return new Array(Math.round(years))
      .fill(0)
      .map((num, i) => i)
      .map(year => start.plus({ years: year }));
  }

  public getMeridiemText(ampm: 'am' | 'pm') {
    return Info.meridiems({ locale: this.locale }).find(
      v => v.toLowerCase() === ampm.toLowerCase()
    )!;
  }

  public getCalendarHeaderText(date: DateTime) {
    return this.format(date, 'MMMM yyyy');
  }

  public getDatePickerHeaderText(date: DateTime) {
    return this.format(date, 'ccc, MMM d');
  }

  public getDateTimePickerHeaderText(date: DateTime) {
    return this.format(date, 'MMM d');
  }

  public getDayText(date: DateTime) {
    return this.format(date, 'd');
  }

  public getHourText(date: DateTime, ampm: boolean) {
    if (ampm) {
      return date.toFormat('hh');
    }

    return date.toFormat('HH');
  }

  public getMinuteText(date: DateTime) {
    return date.toFormat('mm');
  }

  public getSecondText(date: DateTime) {
    return date.toFormat('ss');
  }

  public getYearText(date: DateTime) {
    return date.toFormat('yyyy');
  }

  public isNull(date: DateTime | null) {
    return date === null;
  }
}
