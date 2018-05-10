import { ComponentClass } from 'react';
import { Utils } from '../typings/utils';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { PickerBaseProps } from '../_shared/PickerBase'
import { Omit } from 'material-ui'
import { MaterialUiPickersDate } from '../typings/date';

export interface TimePickerWrapperProps extends PickerBaseProps,
  Omit<ModalWrapperProps, 'onChange'> {
    utils?: Utils<MaterialUiPickersDate>;
}

declare const TimePickerWrapper: ComponentClass<TimePickerWrapperProps>;

export default TimePickerWrapper;
