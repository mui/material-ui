import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface PaginationItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
    props: P & {
        color?: 'standard' | 'primary' | 'secondary';
        disabled?: boolean;
        page?: number;
        selected?: boolean;
        shape?: 'round' | 'rounded';
        size?: 'small' | 'medium' | 'large';
        type?: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
        variant?: 'text' | 'outlined';
    };
    defaultComponent: D;
    classKey: PaginationItemClassKey;
}

declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemClassKey =
    | 'root'
    | 'page'
    | 'sizeSmall'
    | 'sizeLarge'
    | 'textPrimary'
    | 'textSecondary'
    | 'outlined'
    | 'outlinedPrimary'
    | 'outlinedSecondary'
    | 'rounded'
    | 'ellipsis'
    | 'focusVisible'
    | 'disabled'
    | 'selected'
    | 'icon';

export type PaginationItemProps<
    D extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
    P = {}
> = OverrideProps<PaginationItemTypeMap<P, D>, D>;

export default PaginationItem;
