'use strict';

var dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var monthLongList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function DateTimeFormat(locale, options) {
  if (process.env.NODE_ENV !== 'production' && locale !== 'en-US') {
    console.warn('Wrong usage of DateTimeFormat. The ' + locale + ' locale is not supported.');
  }

  this.format = function (date) {
    var output = undefined;

    if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {

      output = dayList[date.getDay()] + ', ';
      output += monthList[date.getMonth()] + ' ';
      output += date.getDate();
    } else if (options.month === 'long' && options.year === 'numeric') {

      output = monthLongList[date.getMonth()];
      output += ' ' + date.getFullYear();
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn('Wrong usage of DateTimeFormat');
    }

    return output;
  };
}

module.exports = {
  DateTimeFormat: DateTimeFormat,

  addDays: function addDays(d, days) {
    var newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },

  addMonths: function addMonths(d, months) {
    var newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },

  addYears: function addYears(d, years) {
    var newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },

  clone: function clone(d) {
    return new Date(d.getTime());
  },

  cloneAsDate: function cloneAsDate(d) {
    var clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  },

  getDaysInMonth: function getDaysInMonth(d) {
    var resultDate = this.getFirstDayOfMonth(d);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);

    return resultDate.getDate();
  },

  getFirstDayOfMonth: function getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },

  getWeekArray: function getWeekArray(d) {
    var dayArray = [];
    var daysInMonth = this.getDaysInMonth(d);
    var daysInWeek = undefined;
    var emptyDays = undefined;
    var firstDayOfWeek = undefined;
    var week = undefined;
    var weekArray = [];

    for (var i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    while (dayArray.length) {
      firstDayOfWeek = dayArray[0].getDay();
      daysInWeek = 7 - firstDayOfWeek;
      emptyDays = 7 - daysInWeek;
      week = dayArray.splice(0, daysInWeek);

      for (var i = 0; i < emptyDays; i++) {
        week.unshift(null);
      }

      weekArray.push(week);
    }

    return weekArray;
  },

  format: function format(date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    return m + '/' + d + '/' + y;
  },

  isEqualDate: function isEqualDate(d1, d2) {
    return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  },

  isBeforeDate: function isBeforeDate(d1, d2) {
    var date1 = this.cloneAsDate(d1);
    var date2 = this.cloneAsDate(d2);

    return date1.getTime() < date2.getTime();
  },

  isAfterDate: function isAfterDate(d1, d2) {
    var date1 = this.cloneAsDate(d1);
    var date2 = this.cloneAsDate(d2);

    return date1.getTime() > date2.getTime();
  },

  isBetweenDates: function isBetweenDates(dateToCheck, startDate, endDate) {
    return !this.isBeforeDate(dateToCheck, startDate) && !this.isAfterDate(dateToCheck, endDate);
  },

  isDateObject: function isDateObject(d) {
    return d instanceof Date;
  },

  monthDiff: function monthDiff(d1, d2) {
    var m = undefined;
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
    return m;
  },

  yearDiff: function yearDiff(d1, d2) {
    return ~ ~(this.monthDiff(d1, d2) / 12);
  }

};