import { UtilsLib } from '../App';

export const createUtilsService = (lib: UtilsLib) => ({
  getFormatString(formats: Record<UtilsLib, string>) {
    switch (lib) {
      case 'date-fns':
        return formats['date-fns'];
      case 'luxon':
        return formats['luxon'] || formats['date-fns'];
      case 'moment':
        return formats['moment'];
      case 'dayjs':
        return formats['dayjs'] || formats['moment'];
      default:
        return formats['date-fns'];
    }
  },
});

export type UtilsService = ReturnType<typeof createUtilsService>;
