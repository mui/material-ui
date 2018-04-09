import LuxonUtils from '../../src/utils/luxon-utils';

describe('Luxon utils', () => {
  let luxonUtil;

  beforeEach(() => {
    luxonUtil = new LuxonUtils();
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
    const now = luxonUtil.date();
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

  it('Should be the start of the day', () => {
    const now = luxonUtil.date(new Date(2018, 0, 1, 1));
    const startDay = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.startOfDay(now)).toEqual(startDay);
  });

  it('Should be the end of the day', () => {
    const now = luxonUtil.date(new Date(2018, 0));
    const endDay = luxonUtil.date(new Date(2018, 0, 1, 23, 59, 59, 999));

    expect(luxonUtil.endOfDay(now)).toEqual(endDay);
  });

  it('Should format correctly', () => {
    const now = luxonUtil.date(new Date(2018, 0));

    expect(luxonUtil.format(now, 'yyyy LLL dd')).toBe('2018 Jan 01');
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

  it('Should check if null', () => {
    const now = luxonUtil.date();

    expect(luxonUtil.isNull(null)).toBe(true);
    expect(luxonUtil.isNull(now)).toBe(false);
  });
});

