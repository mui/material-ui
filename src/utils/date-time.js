import warning from 'warning';

const dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'];
const monthLongList = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function DateTimeFormat(locale, options) {
  warning(locale === 'en-US',
    'Wrong usage of DateTimeFormat. The ' + locale + ' locale is not supported.');

  this.format = function(date) {
    let output;

    if (options.month === 'short' &&
      options.weekday === 'short' &&
      options.day === '2-digit') {

      output = dayList[date.getDay()] + ', ';
      output += monthList[date.getMonth()] + ' ';
      output += date.getDate();
    } else if (options.month === 'long' && options.year === 'numeric') {
      output = monthLongList[date.getMonth()];
      output += ' ' + date.getFullYear();
    } else if (options.weekday === 'narrow') {
      output = dayAbbreviation[date.getDay()];
    } else {
      warning(false, 'Wrong usage of DateTimeFormat');
    }

    return output;
  };
}

export default {
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

  getFirstDayOfWeek() {
    const now = new Date();
    return new Date(now.setDate(now.getDate() - now.getDay()));
  },

  getWeekArray(d, firstDayOfWeek) {
    let dayArray = [];
    let daysInMonth = this.getDaysInMonth(d);
    let weekArray = [];
    let week = [];

    for (let i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    const addWeek = week => {
      const emptyDays = 7 - week.length;
      for (let i = 0; i < emptyDays; ++i) {
        week[weekArray.length ? 'push' : 'unshift'](null);
      }
      weekArray.push(week);
    };

    dayArray.forEach(day => {
      if (week.length > 0 && day.getDay() === firstDayOfWeek) {
        addWeek(week);
        week = [];
      }
      week.push(day);
      if (dayArray.indexOf(day) === dayArray.length - 1) {
        addWeek(week);
      }
    });

    return weekArray;
  },

  localizedWeekday(DateTimeFormat, locale, day, firstDayOfWeek) {
    const weekdayFormatter = new DateTimeFormat(locale, {weekday: 'narrow'});
    const firstDayDate = this.getFirstDayOfWeek();

    return weekdayFormatter.format(this.addDays(firstDayDate, day + firstDayOfWeek));
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
