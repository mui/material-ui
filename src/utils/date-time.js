let translate = require('counterpart');

translate.registerTranslations('en', require('../locales/en'));
translate.registerTranslations('es', require('../locales/es'));

module.exports = {

  setLocale(l) {
    translate.setLocale(l);
  },

  addDays(d, days) {
    let newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },

  addMonths(d, months) {
    let newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },
  
  addYears(d, years) {
    let newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },

  clone(d) {
    return new Date(d.getTime());
  },

  cloneAsDate(d) {
    let clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  },

  getDaysInMonth(d) {
    let resultDate = this.getFirstDayOfMonth(d);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);

    return resultDate.getDate();
  },

  getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },

  getFullMonth(d) {
    let month = d.getMonth();
    switch (month) {
      case 0: return translate('months.full.january');
      case 1: return translate('months.full.february');
      case 2: return translate('months.full.march');
      case 3: return translate('months.full.april');
      case 4: return translate('months.full.may');
      case 5: return translate('months.full.june');
      case 6: return translate('months.full.july');
      case 7: return translate('months.full.august');
      case 8: return translate('months.full.september');
      case 9: return translate('months.full.october');
      case 10: return translate('months.full.november');
      case 11: return translate('months.full.december');
    }
  },

  getShortMonth(d) {
    let month = d.getMonth();
    switch (month) {
      case 0: return translate('months.short.jan');
      case 1: return translate('months.short.feb');
      case 2: return translate('months.short.mar');
      case 3: return translate('months.short.apr');
      case 4: return translate('months.short.may');
      case 5: return translate('months.short.jun');
      case 6: return translate('months.short.jul');
      case 7: return translate('months.short.aug');
      case 8: return translate('months.short.sep');
      case 9: return translate('months.short.oct');
      case 10: return translate('months.short.nov');
      case 11: return translate('months.short.dec');
    }
  },

  getDayOfWeek(d) {
    let dow = d.getDay();
    switch (dow) {
      case 0: return translate('days.sunday.short');
      case 1: return translate('days.monday.short');
      case 2: return translate('days.tuesday.short');
      case 3: return translate('days.wednesday.short');
      case 4: return translate('days.thursday.short');
      case 5: return translate('days.friday.short');
      case 6: return translate('days.saturday.short');
    }
  },

  getWeekArray(d) {
    let dayArray = [];
    let daysInMonth = this.getDaysInMonth(d);
    let daysInWeek;
    let emptyDays;
    let firstDayOfWeek;
    let week;
    let weekArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    while (dayArray.length) {
      firstDayOfWeek = dayArray[0].getDay();
      daysInWeek = 7 - firstDayOfWeek;
      emptyDays = 7 - daysInWeek;
      week = dayArray.splice(0, daysInWeek);

      for (let i = 0; i < emptyDays; i++) {
        week.unshift(null);
      }
      weekArray.push(week);
    }
    return weekArray;
  },

  format(date) {
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let y = date.getFullYear();
    return m + '/' + d + '/' + y;
  },

  isEqualDate(d1, d2) {
    return d1 && d2 &&
      (d1.getFullYear() === d2.getFullYear()) &&
      (d1.getMonth() === d2.getMonth()) &&
      (d1.getDate() === d2.getDate());
  },

  isBeforeDate(d1, d2) {
    let date1 = this.cloneAsDate(d1);
    let date2 = this.cloneAsDate(d2);

    return (date1.getTime() < date2.getTime());
  },

  isAfterDate(d1, d2) {
    let date1 = this.cloneAsDate(d1);
    let date2 = this.cloneAsDate(d2);

    return (date1.getTime() > date2.getTime());
  },

  isBetweenDates(dateToCheck, startDate, endDate) {
    return (!(this.isBeforeDate(dateToCheck, startDate)) &&
            !(this.isAfterDate(dateToCheck, endDate)));
  },

  isDateObject(d) {
    return d instanceof Date;
  },

  monthDiff(d1, d2) {
    let m;
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
    return m;
  },

  yearDiff(d1, d2) {
    return ~~(this.monthDiff(d1, d2) / 12);
  },

};
