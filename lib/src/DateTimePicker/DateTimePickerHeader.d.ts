import { ComponentClass } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { Utils } from '../utils/utils';

type MeridiemMode = 'am' | 'pm';

export interface DateTimePickerHeaderProps {
  date: object;
  meridiemMode: MeridiemMode;
  openView: DateTimePickerView;
  onOpenViewChange: (view: DateTimePickerView) => void;
  setMeridiemMode: (mode: MeridiemMode) => void;
  ampm?: boolean;
  utils?: Utils;
}

declare const DateTimePickerHeader: ComponentClass<DateTimePickerHeaderProps>;

export default DateTimePickerHeader;
