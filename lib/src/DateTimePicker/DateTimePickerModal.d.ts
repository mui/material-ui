import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from '../DatePicker/components/Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { MaterialUiPickersDate } from '../typings/date'
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'
import { BaseDateTimePickerProps } from './DateTimePicker';

export interface DateTimePickerModalProps extends
  BasePickerProps,
  BaseDateTimePickerProps,
  Omit<ModalWrapperProps, 'onChange' | 'value'> {}

declare const DateTimePickerModal: ComponentClass<DateTimePickerModalProps>;

export default DateTimePickerModal;
