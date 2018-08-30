import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './components/Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { MaterialUiPickersDate } from '../typings/date'
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'
import { BaseDatePickerProps } from './DatePicker';

export interface DatePickerModalProps extends
  BasePickerProps,
  BaseDatePickerProps,
  Omit<ModalWrapperProps, 'onChange' | 'value'> {}

declare const DatePickerModal: ComponentClass<DatePickerModalProps>;

export default DatePickerModal;
