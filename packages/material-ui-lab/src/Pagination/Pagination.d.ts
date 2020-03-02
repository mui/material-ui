import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface PaginationProps
    extends StandardProps<React.HTMLAttributes<HTMLElement>, PaginationClassKey, 'onChange'> {
    boundaryCount?: number;
    color?: 'default' | 'primary' | 'secondary';
    count?: number;
    defaultPage?: number;
    disabled?: boolean;
    getItemAriaLabel?: (type: string | undefined, page: number, selected: boolean) => string;
    hideNextButton?: boolean;
    hidePrevButton?: boolean;
    onChange?: (event: React.ChangeEvent<{}>, page: number) => void;
    page?: number;
    renderItem?: (params: object) => React.ReactNode;
    shape?: 'round' | 'rounded';
    showFirstButton?: boolean;
    showLastButton?: boolean;
    siblingCount?: number;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined';
}

export type PaginationClassKey =
    | 'root'
    | 'ul';

export default function Pagination(props: PaginationProps): JSX.Element;
