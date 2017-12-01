import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';

export interface TimePickerWrapperProps extends ModalWrapperProps {
    onChange: (date: object) => void;
    autoOk?: boolean;
    returnMoment?: boolean;
    ampm?: boolean;
    utils?: Utils;
}

declare const TimePickerWrapper: ComponentClass<TimePickerWrapperProps>;

export default TimePickerWrapper;
