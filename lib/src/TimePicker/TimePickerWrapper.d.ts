import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';

export interface TimePickerWrapperProps extends ModalWrapperProps {
    onChange: (date: Date) => void;
    autoOk?: boolean;
    returnMoment?: boolean;
    ampm?: boolean;
    utils?: Utils;
}

declare const TimePickerWrapper: ComponentClass<TimePickerWrapperProps>;

export default TimePickerWrapper;
