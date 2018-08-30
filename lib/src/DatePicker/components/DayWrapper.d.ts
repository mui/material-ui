import { ComponentClass, ReactNode } from 'react';

export interface DayWrapperProps {
    children: ReactNode;
    dayInCurrentMonth?: boolean,
    disabled?: boolean;
    onSelect: (value: any) => void;
    value: any;
}

declare const DayWrapper: ComponentClass<DayWrapperProps>;

export default DayWrapper;
