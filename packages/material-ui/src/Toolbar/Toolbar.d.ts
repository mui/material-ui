import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ToolbarPropsVariantOverrides {}
export type ToolbarVariantDefaults = Record<'regular' | 'dense', true>;

export interface ToolbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
     * The Toolbar is a flex container, allowing flex item properites to be used to lay out the children.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element unless `disableGutters={true}`. */
      gutters?: string;
      /** Styles applied to the root element if `variant="regular"`. */
      regular?: string;
      /** Styles applied to the root element if `variant="dense"`. */
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
