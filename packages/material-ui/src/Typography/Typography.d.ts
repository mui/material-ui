import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { PropTypes } from '..';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Variant } from '../styles/createTypography';

export interface TypographyPropsVariantOverrides {}
export type TypographyVariantDefaults = Record<Variant | 'inherit', true>;

export interface TypographyTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * Set the text-align on the component.
     * @default 'inherit'
     */
    align?: PropTypes.Alignment;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      body2?: string;
      body1?: string;
      caption?: string;
      button?: string;
      h1?: string;
      h2?: string;
      h3?: string;
      h4?: string;
      h5?: string;
      h6?: string;
      subtitle1?: string;
      subtitle2?: string;
      overline?: string;
      inherit?: string;
      alignLeft?: string;
      alignCenter?: string;
      alignRight?: string;
      alignJustify?: string;
      noWrap?: string;
      gutterBottom?: string;
      paragraph?: string;
      colorInherit?: string;
      colorPrimary?: string;
      colorSecondary?: string;
      colorTextPrimary?: string;
      colorTextSecondary?: string;
      colorError?: string;
      displayInline?: string;
      displayBlock?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'initial'
     */
    color?:
      | 'initial'
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'textPrimary'
      | 'textSecondary'
      | 'error';
    /**
     * Controls the display type
     * @default 'initial'
     */
    display?: 'initial' | 'block' | 'inline';
    /**
     * If `true`, the text will have a bottom margin.
     * @default false
     */
    gutterBottom?: boolean;
    /**
     * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     *
     * Note that text overflow can only happen with block or inline-block level elements
     * (the element needs to have a width in order to overflow).
     * @default false
     */
    noWrap?: boolean;
    /**
     * If `true`, the text will have a bottom margin.
     * @default false
     */
    paragraph?: boolean;
    /**
     * Applies the theme typography styles.
     * @default 'body1'
     */
    variant?: OverridableStringUnion<TypographyVariantDefaults, TypographyPropsVariantOverrides>;
    /**
     * The component maps the variant prop to a range of different HTML element types.
     * For instance, subtitle1 to `<h6>`.
     * If you wish to change that mapping, you can provide your own.
     * Alternatively, you can use the `component` prop.
     * @default {
     *   h1: 'h1',
     *   h2: 'h2',
     *   h3: 'h3',
     *   h4: 'h4',
     *   h5: 'h5',
     *   h6: 'h6',
     *   subtitle1: 'h6',
     *   subtitle2: 'h6',
     *   body1: 'p',
     *   body2: 'p',
     *   inherit: 'p',
     * }
     */
    variantMapping?: Partial<
      Record<
        OverridableStringUnion<TypographyVariantDefaults, TypographyPropsVariantOverrides>,
        string
      >
    >;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 * - [Typography](https://material-ui.com/components/typography/)
 *
 * API:
 *
 * - [Typography API](https://material-ui.com/api/typography/)
 */
declare const Typography: OverridableComponent<TypographyTypeMap>;

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TypographyTypeMap<P, D>, D>;

export type TypographyClassKey = keyof NonNullable<TypographyTypeMap['props']['classes']>;

export default Typography;
