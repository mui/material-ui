import defaultMoment from 'moment';

var MomentUtils = /** @class */ (function () {
    function MomentUtils(_a) {
        var _b = _a === void 0 ? {} : _a, locale = _b.locale, moment = _b.moment;
        this.dateTime12hFormat = 'MMMM Do hh:mm a';
        this.dateTime24hFormat = 'MMMM Do HH:mm';
        this.time12hFormat = 'hh:mm A';
        this.time24hFormat = 'HH:mm';
        this.dateFormat = 'MMMM Do';
        this.moment = moment || defaultMoment;
        this.locale = locale;
    }
    MomentUtils.prototype.parse = function (value, format) {
        return this.moment(value, format, true);
    };
    MomentUtils.prototype.date = function (value) {
        return this.moment(value);
    };
    MomentUtils.prototype.isValid = function (date) {
        return date.isValid();
    };
    MomentUtils.prototype.isNull = function (date) {
        return date.parsingFlags().nullInput;
    };
    MomentUtils.prototype.getDiff = function (date, comparing) {
        return date.diff(comparing);
    };
    MomentUtils.prototype.isAfter = function (date, value) {
        return date.isAfter(value);
    };
    MomentUtils.prototype.isBefore = function (date, value) {
        return date.isBefore(value);
    };
    MomentUtils.prototype.isAfterDay = function (date, value) {
        return date.isAfter(value, 'day');
    };
    MomentUtils.prototype.isBeforeDay = function (date, value) {
        return date.isBefore(value, 'day');
    };
    MomentUtils.prototype.isBeforeYear = function (date, value) {
        return date.isBefore(value, 'year');
    };
    MomentUtils.prototype.isAfterYear = function (date, value) {
        return date.isAfter(value, 'year');
    };
    MomentUtils.prototype.startOfDay = function (date) {
        return date.clone().startOf('day');
    };
    MomentUtils.prototype.endOfDay = function (date) {
        return date.clone().endOf('day');
    };
    MomentUtils.prototype.format = function (date, formatString) {
        return date.format(formatString);
    };
    MomentUtils.prototype.formatNumber = function (numberToFormat) {
        return numberToFormat;
    };
    MomentUtils.prototype.getHours = function (date) {
        return date.get('hours');
    };
    MomentUtils.prototype.addDays = function (date, count) {
        return count < 0
            ? date.clone().subtract(Math.abs(count), 'days')
            : date.clone().add(count, 'days');
    };
    MomentUtils.prototype.setHours = function (date, count) {
        return date.clone().hours(count);
    };
    MomentUtils.prototype.getMinutes = function (date) {
        return date.get('minutes');
    };
    MomentUtils.prototype.setMinutes = function (date, count) {
        return date.clone().minutes(count);
    };
    MomentUtils.prototype.getSeconds = function (date) {
        return date.get('seconds');
    };
    MomentUtils.prototype.setSeconds = function (date, count) {
        return date.clone().seconds(count);
    };
    MomentUtils.prototype.getMonth = function (date) {
        return date.get('month');
    };
    MomentUtils.prototype.isSameDay = function (date, comparing) {
        return date.isSame(comparing, 'day');
    };
    MomentUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === 'am' ? 'AM' : 'PM';
    };
    MomentUtils.prototype.getStartOfMonth = function (date) {
        return date.clone().startOf('month');
    };
    MomentUtils.prototype.getNextMonth = function (date) {
        return date.clone().add(1, 'month');
    };
    MomentUtils.prototype.getPreviousMonth = function (date) {
        return date.clone().subtract(1, 'month');
    };
    MomentUtils.prototype.getYear = function (date) {
        return date.get('year');
    };
    MomentUtils.prototype.setYear = function (date, year) {
        return date.clone().set('year', year);
    };
    MomentUtils.prototype.mergeDateAndTime = function (date, time) {
        return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
    };
    MomentUtils.prototype.getWeekdays = function () {
        var _this = this;
        return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
            return _this.moment()
                .weekday(dayOfWeek)
                .format('dd');
        });
    };
    MomentUtils.prototype.isEqual = function (value, comparing) {
        if (value === null && comparing === null) {
            return true;
        }
        return this.moment(value).isSame(comparing);
    };
    MomentUtils.prototype.getWeekArray = function (date) {
        var start = date
            .clone()
            .startOf('month')
            .startOf('week');
        var end = date
            .clone()
            .endOf('month')
            .endOf('week');
        var count = 0;
        var current = start;
        var nestedWeeks = [];
        while (current.isBefore(end)) {
            var weekNumber = Math.floor(count / 7);
            nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
            nestedWeeks[weekNumber].push(current);
            current = current.clone().add(1, 'day');
            count += 1;
        }
        return nestedWeeks;
    };
    MomentUtils.prototype.getYearRange = function (start, end) {
        var startDate = this.moment(start).startOf('year');
        var endDate = this.moment(end).endOf('year');
        var years = [];
        var current = startDate;
        while (current.isBefore(endDate)) {
            years.push(current);
            current = current.clone().add(1, 'year');
        }
        return years;
    };
    // displaying methods
    MomentUtils.prototype.getCalendarHeaderText = function (date) {
        return date.format('MMMM YYYY');
    };
    MomentUtils.prototype.getYearText = function (date) {
        return date.format('YYYY');
    };
    MomentUtils.prototype.getDatePickerHeaderText = function (date) {
        return date.format('ddd, MMM D');
    };
    MomentUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return date.format('MMM D');
    };
    MomentUtils.prototype.getDayText = function (date) {
        return date.format('D');
    };
    MomentUtils.prototype.getHourText = function (date, ampm) {
        return date.format(ampm ? 'hh' : 'HH');
    };
    MomentUtils.prototype.getMinuteText = function (date) {
        return date.format('mm');
    };
    MomentUtils.prototype.getSecondText = function (date) {
        return date.format('ss');
    };
    return MomentUtils;
}());

export default MomentUtils;
