import { ComponentClass } from 'react';
import { Utils } from '../typings/utils';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'
import { MaterialUiPickersDate } from '../typings/date';

export interface TimePickerWrapperProps extends BasePickerProps, Omit<ModalWrapperProps, 'onChange' | 'value'> {

}

declare const TimePickerWrapper: ComponentClass<TimePickerWrapperProps>;

export default TimePickerWrapper;
