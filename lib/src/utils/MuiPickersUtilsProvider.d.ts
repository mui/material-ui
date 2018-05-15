import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';

export interface MuiPickersUtilsProviderProps {
  utils: any;
  children: ReactNode;
  locale?: any;
  moment?: any;
}

declare const MuiPickersUtilsProvider: ComponentClass<MuiPickersUtilsProviderProps>;

export default MuiPickersUtilsProvider;
