import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from '../DatePicker/components/Calendar';
import { InlineWrapperProps } from '../wrappers/InlineWrapper';
import { MaterialUiPickersDate } from '../typings/date'
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'
import { BaseDateTimePickerProps } from './DateTimePicker';

export interface DateTimePickerInlineProps extends
  BasePickerProps,
  BaseDateTimePickerProps,
  Omit<InlineWrapperProps, 'onChange' | 'value'> {}

declare const DateTimePickerInline: ComponentClass<DateTimePickerInlineProps>;

export default DateTimePickerInline;
