import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ToolbarPropsVariantOverrides {}
export type ToolbarVariantDefaults = Record<'regular' | 'dense', true>;

export interface ToolbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      gutters?: string;
      regular?: string;
      dense?: string;
    };
    /**
     * If `true`, disables gutter padding.
     * @default false
     */
    disableGutters?: boolean;
    /**
     * The variant to use.
     * @default 'regular'
     */
    variant?: OverridableStringUnion<ToolbarVariantDefaults, ToolbarPropsVariantOverrides>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [App Bar](https://material-ui.com/components/app-bar/)
 *
 * API:
 *
 * - [Toolbar API](https://material-ui.com/api/toolbar/)
 */
declare const Toolbar: OverridableComponent<ToolbarTypeMap>;

export type ToolbarClassKey = keyof NonNullable<ToolbarTypeMap['props']['classes']>;

export type ToolbarProps<
  D extends React.ElementType = ToolbarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ToolbarTypeMap<P, D>, D>;

export default Toolbar;
