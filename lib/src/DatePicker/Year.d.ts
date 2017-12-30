import { ComponentClass, ReactNode } from 'react';

export interface YearProps {
    children: ReactNode;
    disabled?: boolean;
    onSelect: (year: number) => void;
    selected?: boolean;
    year: number;
}

declare const Year: ComponentClass<YearProps>;

export default Year;
