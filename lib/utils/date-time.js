'use strict';

module.exports = {

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

  getFullMonth: function getFullMonth(d) {
    var month = d.getMonth();
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
    }
  },

  getShortMonth: function getShortMonth(d) {
    var month = d.getMonth();
    switch (month) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  },

  getDayOfWeek: function getDayOfWeek(d) {
    var dow = d.getDay();
    switch (dow) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
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