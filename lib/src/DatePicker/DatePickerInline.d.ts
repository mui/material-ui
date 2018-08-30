import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './components/Calendar';
import { MaterialUiPickersDate } from '../typings/date'
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'
import { BaseDatePickerProps } from './DatePicker';
import { InlineWrapperProps } from '../wrappers/InlineWrapper';

export interface DatePickerInlineProps extends
  BasePickerProps,
  BaseDatePickerProps,
  Omit<InlineWrapperProps, 'onChange' | 'value'> {
    onlyCalendar?: boolean
  }

declare const DatePickerInline: ComponentClass<DatePickerInlineProps>;

export default DatePickerInline;
