import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { Breakpoint } from '@mui/system';
import { SxProps } from '../styles/types';

export type ContainerSlot = 'root';

export interface ContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    children?: React.ReactNode;
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
    maxWidth?: Breakpoint | false;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ContainerProps<
  D extends React.ElementType = ContainerTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ContainerTypeMap<P, D>, D>;

export interface ContainerOwnerState extends ContainerProps {}
