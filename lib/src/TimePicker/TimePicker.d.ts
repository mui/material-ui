import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';
import { Moment } from 'moment';

export interface TimePickerProps {
    date: Moment;
    onChange: (date: Moment, isFinished?: boolean) => void;
    ampm?: boolean;
    utils?: Utils;
}

declare const TimePicker: ComponentClass<TimePickerProps>;

export default TimePicker;
