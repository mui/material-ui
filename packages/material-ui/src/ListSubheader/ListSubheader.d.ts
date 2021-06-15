import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListSubheaderClasses } from './listSubheaderClasses';

export interface ListSubheaderTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListSubheaderClasses>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'default'
     */
    color?: 'default' | 'primary' | 'inherit';
    /**
     * If `true`, the List Subheader will not have gutters.
     * @default false
     */
    disableGutters?: boolean;
    /**
     * If `true`, the List Subheader will not stick to the top during scroll.
     * @default false
     */
    disableSticky?: boolean;
    /**
     * If `true`, the List Subheader is indented.
     * @default false
     */
    inset?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListSubheader API](https://material-ui.com/api/list-subheader/)
 */
declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap>;

export type ListSubheaderProps<
  D extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ListSubheaderTypeMap<P, D>, D>;

export default ListSubheader;
