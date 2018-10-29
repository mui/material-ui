'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var addDays = _interopDefault(require('date-fns/addDays'));
var addMonths = _interopDefault(require('date-fns/addMonths'));
var addYears = _interopDefault(require('date-fns/addYears'));
var differenceInMilliseconds = _interopDefault(require('date-fns/differenceInMilliseconds'));
var eachDayOfInterval = _interopDefault(require('date-fns/eachDayOfInterval'));
var endOfDay = _interopDefault(require('date-fns/endOfDay'));
var endOfMonth = _interopDefault(require('date-fns/endOfMonth'));
var endOfWeek = _interopDefault(require('date-fns/endOfWeek'));
var endOfYear = _interopDefault(require('date-fns/endOfYear'));
var format = _interopDefault(require('date-fns/format'));
var getHours = _interopDefault(require('date-fns/getHours'));
var getSeconds = _interopDefault(require('date-fns/getSeconds'));
var getYear = _interopDefault(require('date-fns/getYear'));
var isAfter = _interopDefault(require('date-fns/isAfter'));
var isBefore = _interopDefault(require('date-fns/isBefore'));
var isEqual = _interopDefault(require('date-fns/isEqual'));
var isSameDay = _interopDefault(require('date-fns/isSameDay'));
var isValid = _interopDefault(require('date-fns/isValid'));
var dateFnsParse = _interopDefault(require('date-fns/parse'));
var setHours = _interopDefault(require('date-fns/setHours'));
var setMinutes = _interopDefault(require('date-fns/setMinutes'));
var setSeconds = _interopDefault(require('date-fns/setSeconds'));
var setYear = _interopDefault(require('date-fns/setYear'));
var startOfDay = _interopDefault(require('date-fns/startOfDay'));
var startOfMonth = _interopDefault(require('date-fns/startOfMonth'));
var startOfWeek = _interopDefault(require('date-fns/startOfWeek'));
var startOfYear = _interopDefault(require('date-fns/startOfYear'));

// date-fns < 2.0.0-alpha.8
var DateFnsUtils = /** @class */ (function () {
    function DateFnsUtils(_a) {
        var locale = (_a === void 0 ? {} : _a).locale;
        this.addDays = addDays;
        this.isValid = isValid;
        this.getDiff = differenceInMilliseconds;
        this.isAfter = isAfter;
        this.isBefore = isBefore;
        this.startOfDay = startOfDay;
        this.endOfDay = endOfDay;
        this.getHours = getHours;
        this.setHours = setHours;
        this.setMinutes = setMinutes;
        this.getSeconds = getSeconds;
        this.setSeconds = setSeconds;
        this.isSameDay = isSameDay;
        this.getStartOfMonth = startOfMonth;
        this.getYear = getYear;
        this.setYear = setYear;
        this.dateTime12hFormat = 'MMMM Do hh:mm a';
        this.dateTime24hFormat = 'MMMM Do HH:mm';
        this.time12hFormat = 'hh:mm A';
        this.time24hFormat = 'HH:mm';
        this.dateFormat = 'MMMM Do';
        this.locale = locale;
    }
    DateFnsUtils.prototype.date = function (value) {
        if (typeof value === 'undefined') {
            return new Date();
        }
        if (value === null) {
            return null;
        }
        return new Date(value);
    };
    DateFnsUtils.prototype.parse = function (value, formatString) {
        if (value === '') {
            return null;
        }
        return dateFnsParse(value, formatString, new Date());
    };
    DateFnsUtils.prototype.format = function (date, formatString) {
        return format(date, formatString, { locale: this.locale });
    };
    DateFnsUtils.prototype.isEqual = function (date, comparing) {
        if (date === null && comparing === null) {
            return true;
        }
        return isEqual(date, comparing);
    };
    DateFnsUtils.prototype.isNull = function (date) {
        return date === null;
    };
    DateFnsUtils.prototype.isAfterDay = function (date, value) {
        return isAfter(date, endOfDay(value));
    };
    DateFnsUtils.prototype.isBeforeDay = function (date, value) {
        return isBefore(date, startOfDay(value));
    };
    DateFnsUtils.prototype.isBeforeYear = function (date, value) {
        return isBefore(date, startOfYear(value));
    };
    DateFnsUtils.prototype.isAfterYear = function (date, value) {
        return isAfter(date, endOfYear(value));
    };
    DateFnsUtils.prototype.formatNumber = function (num) {
        return num;
    };
    DateFnsUtils.prototype.getMinutes = function (date) {
        return date.getMinutes();
    };
    DateFnsUtils.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    DateFnsUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === 'am' ? 'AM' : 'PM';
    };
    DateFnsUtils.prototype.getNextMonth = function (date) {
        return addMonths(date, 1);
    };
    DateFnsUtils.prototype.getPreviousMonth = function (date) {
        return addMonths(date, -1);
    };
    DateFnsUtils.prototype.mergeDateAndTime = function (date, time) {
        return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
    };
    DateFnsUtils.prototype.getWeekdays = function () {
        var _this = this;
        var now = new Date();
        return eachDayOfInterval({
            start: startOfWeek(now, { locale: this.locale }),
            end: endOfWeek(now, { locale: this.locale })
        }, {
            locale: this.locale
        }).map(function (day) { return format(day, 'dd', { locale: _this.locale }); });
    };
    DateFnsUtils.prototype.getWeekArray = function (date) {
        var start = startOfWeek(startOfMonth(date), { locale: this.locale });
        var end = endOfWeek(endOfMonth(date), { locale: this.locale });
        var count = 0;
        var current = start;
        var nestedWeeks = [];
        while (isBefore(current, end)) {
            var weekNumber = Math.floor(count / 7);
            nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
            nestedWeeks[weekNumber].push(current);
            current = addDays(current, 1);
            count += 1;
        }
        return nestedWeeks;
    };
    DateFnsUtils.prototype.getYearRange = function (start, end) {
        var startDate = startOfYear(new Date(start));
        var endDate = endOfYear(new Date(end));
        var years = [];
        var current = startDate;
        while (isBefore(current, endDate)) {
            years.push(current);
            current = addYears(current, 1);
        }
        return years;
    };
    // displaying methpds
    DateFnsUtils.prototype.getCalendarHeaderText = function (date) {
        return format(date, 'MMMM YYYY', { locale: this.locale });
    };
    DateFnsUtils.prototype.getYearText = function (date) {
        return format(date, 'YYYY', { locale: this.locale });
    };
    DateFnsUtils.prototype.getDatePickerHeaderText = function (date) {
        return format(date, 'ddd, MMM D', { locale: this.locale });
    };
    DateFnsUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return format(date, 'MMM D', { locale: this.locale });
    };
    DateFnsUtils.prototype.getDayText = function (date) {
        return format(date, 'D', { locale: this.locale });
    };
    DateFnsUtils.prototype.getHourText = function (date, ampm) {
        return format(date, ampm ? 'hh' : 'HH', { locale: this.locale });
    };
    DateFnsUtils.prototype.getMinuteText = function (date) {
        return format(date, 'mm', { locale: this.locale });
    };
    DateFnsUtils.prototype.getSecondText = function (date) {
        return format(date, 'ss', { locale: this.locale });
    };
    return DateFnsUtils;
}());

module.exports = DateFnsUtils;
