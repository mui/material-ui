import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { TypographyClasses } from './typographyClasses';
import { SxProps } from '../styles/defaultTheme';
import { TypographySystem } from '../styles/types';

export interface TypographyTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TypographyClasses>;
    /**
     * If `true`, the text will have a bottom margin.
     * @default false
     */
    gutterBottom?: boolean;
    /**
     * Applies the theme typography styles.
     * @default 'body1'
     */
    level?: keyof TypographySystem | 'inherit';
    /**
     * The component maps the variant prop to a range of different HTML element types.
     * For instance, body1 to `<h6>`.
     * If you wish to change that mapping, you can provide your own.
     * Alternatively, you can use the `component` prop.
     * @default {
     *   h1: 'h1',
     *   h2: 'h2',
     *   h3: 'h3',
     *   h4: 'h4',
     *   h5: 'h5',
     *   h6: 'h6',
     *   body1: 'p',
     *   body2: 'p',
     *   body3: 'p',
     *   inherit: 'p',
     * }
     */
    levelMapping?: Partial<Record<keyof TypographySystem | 'inherit', string>>;
    /**
     * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     *
     * Note that text overflow can only happen with block or inline-block level elements
     * (the element needs to have a width in order to overflow).
     * @default false
     */
    noWrap?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<TypographyTypeMap<P, D>, D>;
