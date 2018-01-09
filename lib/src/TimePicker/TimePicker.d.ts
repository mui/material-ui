import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';

export interface TimePickerProps {
    date: object;
    onChange: (date: Moment, isFinished?: boolean) => void;
    ampm?: boolean;
    utils?: Utils;
}

declare const TimePicker: ComponentClass<TimePickerProps>;

export default TimePicker;
