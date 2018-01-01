import { ComponentClass, ReactNode } from 'react';

export interface YearProps {
    children: ReactNode;
    disabled?: boolean;
    onSelect: (value: any) => void;
    selected?: boolean;
    value: any;
}

declare const Year: ComponentClass<YearProps>;

export default Year;
