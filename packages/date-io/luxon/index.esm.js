import { DateTime, Info } from 'luxon';

var LuxonUtils = /** @class */ (function () {
    function LuxonUtils(_a) {
        var locale = (_a === void 0 ? {} : _a).locale;
        this.parse = DateTime.fromFormat;
        this.dateTime12hFormat = 'ff';
        this.dateTime24hFormat = 'f';
        this.time12hFormat = 't';
        this.time24hFormat = 'T';
        this.dateFormat = 'DD';
        this.locale = locale || 'en';
    }
    LuxonUtils.prototype.date = function (value) {
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
    };
    LuxonUtils.prototype.addDays = function (date, count) {
        if (count < 0) {
            return date.minus({ days: Math.abs(count) });
        }
        return date.plus({ days: count });
    };
    LuxonUtils.prototype.isValid = function (date) {
        return date.isValid;
    };
    LuxonUtils.prototype.isEqual = function (value, comparing) {
        if (value === null && comparing === null) {
            return true;
        }
        return value === comparing;
    };
    LuxonUtils.prototype.isSameDay = function (value, comparing) {
        return value.hasSame(comparing, 'day');
    };
    LuxonUtils.prototype.isAfter = function (value, comparing) {
        return value > comparing;
    };
    LuxonUtils.prototype.isAfterDay = function (value, comparing) {
        var diff = value.diff(comparing, 'days').toObject();
        return diff.days > 0;
    };
    LuxonUtils.prototype.isAfterYear = function (value, comparing) {
        var diff = value.diff(comparing, 'years').toObject();
        return diff.years > 0;
    };
    LuxonUtils.prototype.isBefore = function (value, comparing) {
        return value < comparing;
    };
    LuxonUtils.prototype.isBeforeDay = function (value, comparing) {
        var diff = value.diff(comparing, 'days').toObject();
        return diff.days < 0;
    };
    LuxonUtils.prototype.isBeforeYear = function (value, comparing) {
        var diff = value.diff(comparing, 'years').toObject();
        return diff.years < 0;
    };
    LuxonUtils.prototype.getDiff = function (value, comparing) {
        if (typeof comparing === 'string') {
            comparing = DateTime.fromJSDate(new Date(comparing));
        }
        return value.diff(comparing).as('millisecond');
    };
    LuxonUtils.prototype.startOfDay = function (value) {
        return value.startOf('day');
    };
    LuxonUtils.prototype.endOfDay = function (value) {
        return value.endOf('day');
    };
    LuxonUtils.prototype.format = function (date, format) {
        return date.setLocale(this.locale).toFormat(format);
    };
    LuxonUtils.prototype.formatNumber = function (numberToFormat) {
        return numberToFormat;
    };
    LuxonUtils.prototype.getHours = function (value) {
        return value.get('hour');
    };
    LuxonUtils.prototype.setHours = function (value, count) {
        return value.set({ hour: count });
    };
    LuxonUtils.prototype.getMinutes = function (value) {
        return value.get('minute');
    };
    LuxonUtils.prototype.setMinutes = function (value, count) {
        return value.set({ minute: count });
    };
    LuxonUtils.prototype.getSeconds = function (value) {
        return value.get('second');
    };
    LuxonUtils.prototype.setSeconds = function (value, count) {
        return value.set({ second: count });
    };
    LuxonUtils.prototype.getMonth = function (value) {
        // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
        return value.get('month') - 1;
    };
    LuxonUtils.prototype.getYear = function (value) {
        return value.get('year');
    };
    LuxonUtils.prototype.setYear = function (value, year) {
        return value.set({ year: year });
    };
    LuxonUtils.prototype.mergeDateAndTime = function (date, time) {
        return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
    };
    LuxonUtils.prototype.getStartOfMonth = function (value) {
        return value.startOf('month');
    };
    LuxonUtils.prototype.getNextMonth = function (value) {
        return value.plus({ months: 1 });
    };
    LuxonUtils.prototype.getPreviousMonth = function (value) {
        return value.minus({ months: 1 });
    };
    LuxonUtils.prototype.getWeekdays = function () {
        return Info.weekdaysFormat('narrow', { locale: this.locale });
    };
    LuxonUtils.prototype.getWeekArray = function (date) {
        var days = date
            .endOf('month')
            .endOf('week')
            .diff(date.startOf('month').startOf('week'), 'days')
            .toObject().days;
        var weeks = [];
        new Array(Math.round(days))
            .fill(0)
            .map(function (_, i) { return i; })
            .map(function (day) {
            return date
                .startOf('month')
                .startOf('week')
                .plus({ days: day });
        })
            .forEach(function (v, i) {
            if (i === 0 || (i % 7 === 0 && i > 6)) {
                weeks.push([v]);
                return;
            }
            weeks[weeks.length - 1].push(v);
        });
        return weeks;
    };
    LuxonUtils.prototype.getYearRange = function (start, end) {
        start = this.date(start);
        end = this.date(end).plus({ years: 1 });
        var years = end.diff(start, 'years').toObject().years;
        if (!years || years <= 0) {
            return [];
        }
        return new Array(Math.round(years))
            .fill(0)
            .map(function (num, i) { return i; })
            .map(function (year) { return start.plus({ years: year }); });
    };
    LuxonUtils.prototype.getMeridiemText = function (ampm) {
        return Info.meridiems({ locale: this.locale }).find(function (v) { return v.toLowerCase() === ampm.toLowerCase(); });
    };
    LuxonUtils.prototype.getCalendarHeaderText = function (date) {
        return this.format(date, 'MMMM yyyy');
    };
    LuxonUtils.prototype.getDatePickerHeaderText = function (date) {
        return this.format(date, 'ccc, MMM d');
    };
    LuxonUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return this.format(date, 'MMM d');
    };
    LuxonUtils.prototype.getDayText = function (date) {
        return this.format(date, 'd');
    };
    LuxonUtils.prototype.getHourText = function (date, ampm) {
        if (ampm) {
            return date.toFormat('hh');
        }
        return date.toFormat('HH');
    };
    LuxonUtils.prototype.getMinuteText = function (date) {
        return date.toFormat('mm');
    };
    LuxonUtils.prototype.getSecondText = function (date) {
        return date.toFormat('ss');
    };
    LuxonUtils.prototype.getYearText = function (date) {
        return date.toFormat('yyyy');
    };
    LuxonUtils.prototype.isNull = function (date) {
        return date === null;
    };
    return LuxonUtils;
}());

export default LuxonUtils;
