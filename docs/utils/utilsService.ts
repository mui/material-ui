import LuxonUtils from '@date-io/luxon';
import DayJsUtils from '@date-io/dayjs';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';

export const utilsMap = {
  moment: MomentUtils,
  luxon: LuxonUtils,
  dayjs: DayJsUtils,
  'date-fns': DateFnsUtils,
};

export type UtilsLib = keyof typeof utilsMap;

export const createUtilsService = (lib: UtilsLib) => ({
  getFormatString(formats: { moment: string; dateFns: string; dayjs?: string; luxon?: string }) {
    switch (lib) {
      case 'date-fns':
        return formats.dateFns;
      case 'luxon':
        return formats.luxon || formats.dateFns;
      case 'moment':
        return formats.moment;
      case 'dayjs':
        return formats.dayjs || formats.moment;
      default:
        return formats.dateFns;
    }
  },
});

export type UtilsService = ReturnType<typeof createUtilsService>;
