import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { Utils } from '../typings/utils';
import DateFnsUtils from './date-fns-utils';

export interface MuiPickersUtilsProviderProps {
  utils: typeof Utils;
  children: ReactNode;
  locale?: any;
  moment?: any;
}

declare const MuiPickersUtilsProvider: ComponentClass<MuiPickersUtilsProviderProps>;

export default MuiPickersUtilsProvider;
