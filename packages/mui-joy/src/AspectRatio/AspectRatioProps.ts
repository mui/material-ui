import { OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/defaultTheme';

export type AspectRatioSlot = 'root';

export interface AspectRatioTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the AspectRatio if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The minimum calculated height of the element (not the CSS height).
     */
    min?: number | string;
    /**
     * The maximum calculated height of the element (not the CSS height).
     */
    max?: number | string;
    /**
     * The aspect-ratio of the element. The current implementation uses padding instead of the CSS aspect-ratio due to browser support.
     * https://caniuse.com/?search=aspect-ratio
     * @default '16 / 9'
     */
    ratio?: number | string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type AspectRatioProps<
  D extends React.ElementType = AspectRatioTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AspectRatioTypeMap<P, D>, D>;
