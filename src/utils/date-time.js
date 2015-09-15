
function DateTimeFormat(locale, options) {
  this.options = options;

  if (process.env.NODE_ENV !== 'production' && locale !== 'en-US') {
    console.warn('Wrong usage of DateTimeFormat');
  }

  this.format = function(date) {
    let output;

    if (options.month === 'short' &&
      options.weekday === 'short' &&
      options.day === '2-digit') {

      const day = date.getDay();
      switch (day) {
        case 0:
          output = 'Sun';
          break;
        case 1:
          output = 'Mon';
          break;
        case 2:
          output = 'Tue';
          break;
        case 3:
          output = 'Wed';
          break;
        case 4:
          output = 'Thu';
          break;
        case 5:
          output = 'Fri';
          break;
        case 6:
          output = 'Sat';
          break;
      }

      output += ', ';

      const month = date.getMonth();
      switch (month) {
        case 0:
          output += 'Jan';
          break;
        case 1:
          output += 'Feb';
          break;
        case 2:
          output += 'Mar';
          break;
        case 3:
          output += 'Apr';
          break;
        case 4:
          output += 'May';
          break;
        case 5:
          output += 'Jun';
          break;
        case 6:
          output += 'Jul';
          break;
        case 7:
          output += 'Aug';
          break;
        case 8:
          output += 'Sep';
          break;
        case 9:
          output += 'Oct';
          break;
        case 10:
          output += 'Nov';
          break;
        case 11:
          output += 'Dec';
          break;
      }

      output += ' ' + date.getDate()
    } else if (options.month === 'long'
        && options.year === 'numeric') {

      switch (date.getMonth()) {
        case 0:
          output = 'January';
          break;
        case 1:
          output = 'February';
          break;
        case 2:
          output = 'March';
          break;
        case 3:
          output = 'April';
          break;
        case 4:
          output = 'May';
          break;
        case 5:
          output = 'June';
          break;
        case 6:
          output = 'July';
          break;
        case 7:
          output = 'August';
          break;
        case 8:
          output = 'September';
          break;
        case 9:
          output = 'October';
          break;
        case 10:
          output = 'November';
          break;
        case 11:
          output = 'December';
          break;
      }

      output += ' ' + date.getFullYear();
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn('Wrong usage of DateTimeFormat');
    }

    return output;
  };
}

module.exports = {
  DateTimeFormat: DateTimeFormat,

  addDays(d, days) {
    const newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },

  addMonths(d, months) {
    const newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },

  addYears(d, years) {
    const newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },

  clone(d) {
    return new Date(d.getTime());
  },

  cloneAsDate(d) {
    const clonedDate = this.clone(d);
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
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return m + '/' + d + '/' + y;
  },

  isEqualDate(d1, d2) {
    return d1 && d2 &&
      (d1.getFullYear() === d2.getFullYear()) &&
      (d1.getMonth() === d2.getMonth()) &&
      (d1.getDate() === d2.getDate());
  },

  isBeforeDate(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getTime() < date2.getTime());
  },

  isAfterDate(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

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
