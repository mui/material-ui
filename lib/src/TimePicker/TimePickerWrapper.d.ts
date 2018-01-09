import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { Moment } from 'moment'

export interface TimePickerWrapperProps extends ModalWrapperProps {
    onChange: (date: Moment) => void;
    autoOk?: boolean;
    returnMoment?: boolean;
    ampm?: boolean;
    utils?: Utils;
}

declare const TimePickerWrapper: ComponentClass<TimePickerWrapperProps>;

export default TimePickerWrapper;
