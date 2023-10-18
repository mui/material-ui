import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styleFunctionSx';
import { Theme, Breakpoint } from '../createTheme';
import { ContainerClasses } from './containerClasses';

export interface ContainerTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & {
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ContainerClasses>;
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
    sx?: SxProps<Theme>;
  };
  defaultComponent: DefaultComponent;
}

export type ContainerProps<
  RootComponent extends React.ElementType = ContainerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ContainerTypeMap<AdditionalProps, RootComponent>, RootComponent>;
