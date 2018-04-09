import { DateTime } from 'luxon';
import { Utils } from '../typings/utils'

declare class LuxonUtils extends Utils {
    locale: any;
    constructor (options?: { locale: any });

    date(value: any): DateTime;
    addDays(value: DateTime, count: number): DateTime;
    isValid(value: DateTime): boolean;
    isEqual(value: DateTime, comparing: DateTime): boolean;
    isSameDay(value: DateTime, comparing: DateTime): boolean

    isAfter(value: DateTime, comparing: DateTime): boolean;
    isAfterDay(value: DateTime, comparing: DateTime): boolean;
    isAfterYear(value: DateTime, comparing: DateTime): boolean;

    isBeforeDay(value: DateTime, comparing: DateTime): boolean;
    isBeforeYear(value: DateTime, comparing: DateTime): boolean;
    isBefore(value: DateTime, comparing: DateTime): boolean;

    startOfDay(value: DateTime): DateTime;
    endOfDay(value: DateTime): DateTime;

    format(value: DateTime, formatString: string): string;
    formatNumber(number: number): string;

    getHours(value: DateTime): number;
    setHours(value: DateTime, count: number): DateTime;
    getMinutes(value: DateTime): number;
    setMinutes(value: DateTime, count: number): DateTime
    getMonth(value: DateTime): number;
    getYear(value: DateTime): number;
    setYear(value: DateTime, year: number): DateTime;

    getStartOfMonth(value: DateTime): DateTime;
    getNextMonth(value: DateTime): DateTime;
    getPreviousMonth(value: DateTime): DateTime;

    getWeekdays(): string[];
    getWeekArray(date: DateTime): DateTime[];
    getYearRange(start: DateTime, end: DateTime): DateTime[];

    // displaying methods
    getMeridiemText(ampm: 'am' | 'pm'): string;
    getCalendarHeaderText(date: DateTime): string;
    getDatePickerHeaderText(date: DateTime): string;
    getDateTimePickerHeaderText(date: DateTime): string;
    getDayText(date: DateTime): string;
    getHourText(date: DateTime, ampm: boolean): string;
    getMinuteText(date: DateTime): string;
    getYearText(date: DateTime): string;
}

export default LuxonUtils;
