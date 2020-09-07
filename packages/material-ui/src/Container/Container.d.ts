import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `disableGutters={true}`. */
      disableGutters?: string;
      /** Styles applied to the root element if `fixed={true}`. */
      fixed?: string;
      /** Styles applied to the root element if `maxWidth="xs"`. */
      maxWidthXs?: string;
      /** Styles applied to the root element if `maxWidth="sm"`. */
      maxWidthSm?: string;
      /** Styles applied to the root element if `maxWidth="md"`. */
      maxWidthMd?: string;
      /** Styles applied to the root element if `maxWidth="lg"`. */
      maxWidthLg?: string;
      /** Styles applied to the root element if `maxWidth="xl"`. */
      maxWidthXl?: string;
    };
    /**
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters?: boolean;
    /**
     * Set the max-width to match the min-width of the current breakpoint.
     * This is useful if you'd prefer to design for a fixed set of sizes
     * instead of trying to accommodate a fully fluid viewport.
     * It's fluid by default.
     * @default false
     */
    fixed?: boolean;
    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     * @default 'lg'
     */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Container](https://material-ui.com/components/container/)
 *
 * API:
 *
 * - [Container API](https://material-ui.com/api/container/)
 */
declare const Container: OverridableComponent<ContainerTypeMap>;

export type ContainerClassKey = keyof NonNullable<ContainerTypeMap['props']['classes']>;

export type ContainerProps<
  D extends React.ElementType = ContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ContainerTypeMap<P, D>, D>;

export default Container;
