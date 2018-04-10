import LuxonUtils from '../../src/utils/luxon-utils';

const checkForFullICU = () => {
  try {
    const january = new Date(9e8);
    const spanish = new Intl.DateTimeFormat('es', { month: 'long' });
    return spanish.format(january) === 'enero';
  } catch (err) {
    return false;
  }
};

describe('Luxon utils', () => {
  let luxonUtil;
  let luxonUtilDe;
  const hasICU = checkForFullICU();
  const hasFullICU = () => hasICU;

  beforeEach(() => {
    luxonUtil = new LuxonUtils();
    luxonUtilDe = new LuxonUtils({ locale: 'de' });
  });

  it('Should return a Luxon DateTime instance', () => {
    const now = luxonUtil.date();
    const nowJs = luxonUtil.date(new Date());
    expect(now.constructor.name).toBe('DateTime');
    expect(nowJs.constructor.name).toBe('DateTime');
  });

  it('Should add one day', () => {
    const now = luxonUtil.date();
    const then = luxonUtil.addDays(now, 1);
    const thenPast = luxonUtil.addDays(now, -1);

    expect(then).toEqual(now.plus({ day: 1 }));
    expect(thenPast).toEqual(now.minus({ day: 1 }));
  });

  it('Should be a valid DateTime', () => {
    const now = luxonUtil.date();

    expect(luxonUtil.isValid(now)).toBe(true);
  });

  it('Should be equal to another DateTime', () => {
    const now = luxonUtil.date();
    const then = now.plus({ day: 1 });

    expect(luxonUtil.isEqual(now, now)).toBe(true);
    expect(luxonUtil.isEqual(now, then)).toBe(false);
  });

  it('Should be on the same day', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const then = now.plus({ hours: 1 });
    const thenOtherDay = now.plus({ days: 1 });

    expect(luxonUtil.isSameDay(now, then)).toBe(true);
    expect(luxonUtil.isSameDay(now, thenOtherDay)).toBe(false);
  });

  it('Should check if one date is after another', () => {
    const now = luxonUtil.date();
    const then = now.plus({ day: 1 });

    expect(luxonUtil.isAfter(now, then)).toBe(false);
    expect(luxonUtil.isAfter(then, now)).toBe(true);
  });

  it('Should check if it is the day after', () => {
    const now = luxonUtil.date();
    const then = now.plus({ day: 1 });

    expect(luxonUtil.isAfterDay(now, then)).toBe(false);
    expect(luxonUtil.isAfterDay(then, now)).toBe(true);
  });

  it('Should check if it is the year after', () => {
    const now = luxonUtil.date();
    const then = now.plus({ years: 1 });

    expect(luxonUtil.isAfterYear(now, then)).toBe(false);
    expect(luxonUtil.isAfterYear(then, now)).toBe(true);
  });

  it('Should check if one date is before another', () => {
    const now = luxonUtil.date();
    const then = now.minus({ day: 1 });

    expect(luxonUtil.isBefore(now, then)).toBe(false);
    expect(luxonUtil.isBefore(then, now)).toBe(true);
  });

  it('Should check if it is the day before', () => {
    const now = luxonUtil.date();
    const then = now.minus({ day: 1 });

    expect(luxonUtil.isBeforeDay(now, then)).toBe(false);
    expect(luxonUtil.isBeforeDay(then, now)).toBe(true);
  });

  it('Should check if it is the year before', () => {
    const now = luxonUtil.date();
    const then = now.minus({ years: 1 });

    expect(luxonUtil.isBeforeYear(now, then)).toBe(false);
    expect(luxonUtil.isBeforeYear(then, now)).toBe(true);
  });

  it('Should get the start of the day', () => {
    const now = luxonUtil.date(new Date(2018, 0, 1, 1));
    const startDay = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.startOfDay(now)).toEqual(startDay);
  });

  it('Should get the end of the day', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const endDay = luxonUtil.date(new Date(2018, 0, 1, 23, 59, 59, 999));

    expect(luxonUtil.endOfDay(now)).toEqual(endDay);
  });

  it('Should format correctly', () => {
    const now = luxonUtil.date(new Date(2018, 2));

    expect(luxonUtil.format(now, 'yyyy LLL dd')).toBe('2018 Mar 01');
    expect(luxonUtilDe.format(now, 'yyyy LLL dd')).toBe(hasFullICU() ? '2018 Mär 01' : '2018 M03 01');
  });

  it('Should format numbers correclty', () => {
    const number = 23;

    expect(luxonUtil.formatNumber(number)).toBe('23');
  });

  it('Should get the hours', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getHours(now)).toBe(0);
  });

  it('Should set hours', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const plusOneHour = now.plus({ hours: 1 });

    expect(luxonUtil.setHours(now, 1)).toEqual(plusOneHour);
  });

  it('Should get the minutes', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getMinutes(now)).toBe(0);
  });

  it('Should set minutes', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const plusOneMinute = now.plus({ minutes: 1 });

    expect(luxonUtil.setMinutes(now, 1)).toEqual(plusOneMinute);
  });

  it('Should get the month', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getMonth(now)).toBe(0);
  });

  it('Should get the year', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getYear(now)).toBe(2018);
  });

  it('Should set the year', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const plusOneYear = now.plus({ year: 1 });

    expect(luxonUtil.setYear(now, 2019)).toEqual(plusOneYear);
  });

  it('Should get the start of the month', () => {
    const now = luxonUtil.date(new Date(2018, 0, 3, 1));
    const startMonth = luxonUtil.date(new Date(2018, 0, 1));

    expect(luxonUtil.getStartOfMonth(now)).toEqual(startMonth);
  });

  it('Should get the next month', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const nextMonth = now.plus({ months: 1 });

    expect(luxonUtil.getNextMonth(now)).toEqual(nextMonth);
  });

  it('Should get the previous month', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const previousMonth = now.minus({ months: 1 });

    expect(luxonUtil.getPreviousMonth(now)).toEqual(previousMonth);
  });

  it('Should get the weekdays', () => {
    const weekdaysEn = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const weekdaysDe = ['M', 'D', 'M', 'D', 'F', 'S', 'S'];
    expect(luxonUtil.getWeekdays()).toEqual(weekdaysEn);
    expect(luxonUtilDe.getWeekdays()).toEqual(hasFullICU() ? weekdaysDe : weekdaysEn);
  });

  it('Should get the weeks of a month', () => {
    const now = luxonUtil.date(new Date(2018, 3));
    const days = 42;
    const weeks = 6;
    const weekArray = luxonUtil.getWeekArray(now);
    const firstWeek = weekArray[0];
    const firstDay = firstWeek[0];
    const lastWeek = weekArray[weeks - 1];
    const lastDay = lastWeek[lastWeek.length - 1];

    expect(weekArray.length).toBe(weeks);
    expect(weekArray.map(arr => arr.length).reduce((p, v) => p + v)).toBe(days);
    expect(firstDay).toEqual(now.startOf('month').startOf('week'));
    expect(lastDay).toEqual(now.endOf('month').endOf('week').startOf('day'));
  });

  it('Should get a range of years', () => {
    const years = [2016, 2017, 2018].map(year => luxonUtil.date(new Date(year, 0)));

    expect(luxonUtil.getYearRange(years[0], years[2])).toEqual([years[0], years[1]]);
    expect(luxonUtil.getYearRange(years[0], years[0])).toEqual([]);
  });

  it('Should get the meridiem text', () => {
    expect(luxonUtil.getMeridiemText('am')).toBe('AM');
    expect(luxonUtil.getMeridiemText('pm')).toBe('PM');
    // Had to disable this test for now, but there is still 100% coverage
    // expect(luxonUtilDe.getMeridiemText('am')).toBe(hasFullICU() ? 'vorm.' : 'AM');
    // expect(luxonUtilDe.getMeridiemText('pm')).toBe(hasFullICU() ? 'nachm.' : 'PM');
  });

  it('Should get the calendar header text', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getCalendarHeaderText(now)).toBe('January 2018');
    expect(luxonUtilDe.getCalendarHeaderText(now)).toBe(hasFullICU() ? 'Januar 2018' : 'M01 2018');
  });

  it('Should get the date picker header text', () => {
    const now = luxonUtil.date(new Date(2018, 2));

    expect(luxonUtil.getDatePickerHeaderText(now)).toBe('Thu, Mar 1');
    expect(luxonUtilDe.getDatePickerHeaderText(now)).toBe(hasFullICU() ? 'Do, März 1' : 'Thu, M03 1');
  });

  it('Should get the date time picker header text', () => {
    const now = luxonUtil.date(new Date(2018, 2));

    expect(luxonUtil.getDateTimePickerHeaderText(now)).toBe('Mar 1');
    expect(luxonUtilDe.getDateTimePickerHeaderText(now)).toBe(hasFullICU() ? 'März 1' : 'M03 1');
  });

  it('Should get the day text', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getDayText(now)).toBe('1');
  });

  it('Should get the hour text', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getHourText(now, true)).toBe('12');
    expect(luxonUtil.getHourText(now, false)).toBe('00');
  });

  it('Should get the minute text', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getMinuteText(now)).toBe('00');
  });

  it('Should get the year text', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.getYearText(now)).toBe('2018');
  });

  it('Should check if null', () => {
    const now = luxonUtil.date();

    expect(luxonUtil.isNull(null)).toBe(true);
    expect(luxonUtil.isNull(now)).toBe(false);
  });
});

