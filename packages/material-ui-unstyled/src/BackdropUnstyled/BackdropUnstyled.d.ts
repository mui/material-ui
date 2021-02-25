import * as React from 'react';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';

export interface BackdropUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The components used for each slot inside the Backdrop.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
    };
    /**
     * The props used for each slot inside the Backdrop.
     * @default {}
     */
    componentsProps?: {
      root?: {
        as: React.ElementType;
        styleProps?: Omit<BackdropUnstyledTypeMap<P, D>['props'], 'components' | 'componentsProps'>;
      };
    };
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `invisible={true}`. */
      invisible?: string;
    };
    /**
     * If `true`, the backdrop is invisible.
     * It can be used when rendering a popover or a custom select component.
     * @default false
     */
    invisible?: boolean;
  };
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from BackdropUnstyled.
 */
export interface ExtendBackdropUnstyledTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & BackdropUnstyledTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ExtendBackdropUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendBackdropUnstyledTypeMap<M>
>;

export type BackdropUnstyledClassKey = keyof NonNullable<
  BackdropUnstyledTypeMap['props']['classes']
>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://material-ui.com/components/backdrop/)
 *
 * API:
 *
 * - [BackdropUnstyled API](https://material-ui.com/api/backdrop-unstyled/)
 */
declare const BackdropUnstyled: OverridableComponent<BackdropUnstyledTypeMap>;

export type BackdropUnstyledProps<
  D extends React.ElementType = BackdropUnstyledTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BackdropUnstyledTypeMap<P, D>, D>;

export default BackdropUnstyled;
