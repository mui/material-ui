import { ComponentClass } from 'react';

export interface ClockNumberProps {
    index: number;
    label: string;
    selected: boolean;
    isInner?: boolean;
}

declare const ClockNumber: ComponentClass<ClockNumberProps>;

export default ClockNumber;
