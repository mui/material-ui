import * as React from 'react';

export interface UsePaginationProps {
    boundaryCount?: number;
    componentName?: string;
    count?: number;
    defaultPage?: number;
    disabled?: boolean;
    hideNextButton?: boolean;
    hidePrevButton?: boolean;
    onChange?: (event: React.ChangeEvent<{}>, page: number) => void;
    page?: number;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    siblingCount?: number;
}

export interface UsePaginationItem {
    onClick: React.ReactEventHandler;
    type: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
    page: number;
    selected: boolean;
    disabled: boolean;
}

export default function usePagination(props: UsePaginationProps): UsePaginationItem[];
