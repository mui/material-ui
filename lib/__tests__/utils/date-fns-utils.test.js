import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '../../src/utils/date-fns-utils';

describe('DateFnsUtils', () => {
  const enUtils = new DateFnsUtils();
  const uaUtils = new DateFnsUtils({ locale: ruLocale });

  describe('getWeekDays', () => {
    it('Should start week from Sunday by default', () => {
      expect(enUtils.getWeekdays()[0]).toEqual('Su');
    });

    it('Should start week from a day, defined by locale', () => {
      expect(uaUtils.getWeekdays()[0]).toEqual('пн');
    });
  });

  describe('getWeekArray', () => {
    it('Should start week from Sunday by default', () => {
      const weekArray = enUtils.getWeekArray(new Date(2018, 3));
      expect(weekArray[0][0]).toEqual(new Date(2018, 3, 1));
    });

    it('Should start week from a day, defined by locale', () => {
      const weekArray = uaUtils.getWeekArray(new Date(2018, 3));
      expect(weekArray[1][0]).toEqual(new Date(2018, 3, 2));
    });
  });
});
