import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    children: NonNullable<React.ReactNode>;
    /**
     * If `true`, the left and right padding is removed.
     */
    disableGutters?: boolean;
    /**
     * Set the max-width to match the min-width of the current breakpoint.
     * This is useful if you'd prefer to design for a fixed set of sizes
     * instead of trying to accommodate a fully fluid viewport.
     * It's fluid by default.
     */
    fixed?: boolean;
    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  };
  defaultComponent: D;
  classKey: ContainerClassKey;
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

export type ContainerClassKey =
  | 'root'
  | 'disableGutters'
  | 'fixed'
  | 'maxWidthXs'
  | 'maxWidthSm'
  | 'maxWidthMd'
  | 'maxWidthLg'
  | 'maxWidthXl';

export type ContainerProps<
  D extends React.ElementType = ContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ContainerTypeMap<P, D>, D>;

export default Container;
