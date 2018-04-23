import uaLocale from 'date-fns/locale/ua';
import DateFnsUtils from '../../src/utils/date-fns-utils';

describe('DateFnsUtils', () => {
  const createInstance = locale => new DateFnsUtils({ locale });

  describe('getWeekDays', () => {
    it('Should start week from Sunday by default', () => {
      const instance = createInstance();
      expect(instance.getWeekdays()[0]).toEqual('Su');
    });

    it('Should start week from a day, defined by locale', () => {
      const instance = createInstance(uaLocale);
      expect(instance.getWeekdays()[0]).toEqual('пн');
    });
  });
});
