import { ComponentClass } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date'

type MeridiemMode = 'am' | 'pm';

export interface DateTimePickerHeaderProps {
  date: MaterialUiPickersDate;
  meridiemMode: MeridiemMode;
  openView: DateTimePickerView;
  onOpenViewChange: (view: DateTimePickerView) => void;
  setMeridiemMode: (mode: MeridiemMode) => void;
  ampm?: boolean;
  utils?: Utils<MaterialUiPickersDate>;
}

declare const DateTimePickerHeader: ComponentClass<DateTimePickerHeaderProps>;

export default DateTimePickerHeader;
