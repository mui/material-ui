import { ComponentClass } from 'react';

export interface ClockPointerProps {
    value: number;
    hasSelected: boolean;
    isInner: boolean;
    max: number;
}

declare const ClockPointer: ComponentClass<ClockPointerProps>;

export default ClockPointer;
