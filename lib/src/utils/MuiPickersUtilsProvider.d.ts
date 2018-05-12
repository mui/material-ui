import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import DateFnsUtils from './date-fns-utils';
import { MaterialUiPickersDate } from '../typings/date';
import MomentUtils from './moment-utils';
import LuxonUtils from './luxon-utils';

export interface MuiPickersUtilsProviderProps {
  utils: typeof MomentUtils | typeof DateFnsUtils | typeof LuxonUtils;
  children: ReactNode;
  locale?: any;
  moment?: any;
}

declare const MuiPickersUtilsProvider: ComponentClass<MuiPickersUtilsProviderProps>;

export default MuiPickersUtilsProvider;
