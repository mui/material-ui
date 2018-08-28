import { ComponentClass } from 'react';
import { ClockType } from '../../constants/clock-types';

export interface ClockProps {
    type: ClockType;
    value: number;
    onChange: (value: number) => void;
    ampm?: boolean;
}

declare const Clock: ComponentClass<ClockProps>;

export default Clock;
